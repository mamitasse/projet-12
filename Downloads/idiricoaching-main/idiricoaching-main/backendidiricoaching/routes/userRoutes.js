const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { loginUser } = require('../controllers/authController');
const User = require('../models/user');

const router = express.Router();

/**
 * Route pour l'inscription des adhérents.
 */
router.post('/adherent-register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    age,
    coachId,
    phone,
    address,
  } = req.body;

  if (!firstName || !lastName || !email || !password || !gender || !age || !coachId || !phone || !address) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'adherent',
      gender,
      age,
      coachId,
      phone,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/**
 * Route pour la connexion des utilisateurs.
 */
router.post('/login', loginUser);

/**
 * Route pour récupérer l'utilisateur connecté.
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('coachId', 'firstName lastName') // Récupère le coach associé
      .select('-password'); // Exclut le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


/**
 * Route pour récupérer tous les adhérents (accessible uniquement aux coaches).
 */
// Route pour récupérer les adhérents associés au coach connecté
router.get('/adherents', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
  try {
    const coachId = req.user.userId; // ID du coach connecté
    const adherents = await User.find({ role: 'adherent', coachId: coachId }).select('firstName lastName email');
    res.json(adherents);
  } catch (error) {
    console.error('Erreur lors de la récupération des adhérents :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Route pour récupérer les détails d'un adhérent par ID
router.get('/:adherentId', authMiddleware, roleMiddleware(['coach']), async (req, res) => {
  const { adherentId } = req.params;

  try {
    const adherent = await User.findById(adherentId).populate('coachId', 'firstName lastName'); // Inclure les détails du coach
    if (!adherent || adherent.role !== 'adherent') {
      return res.status(404).json({ message: 'Adhérent non trouvé.' });
    }

    res.json(adherent);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'adhérent :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


// Route pour récupérer les créneaux disponibles pour l'adhérent connecté
router.get('/adherent/slots', authMiddleware, roleMiddleware(['adherent']), async (req, res) => {
  try {
    const { coachId } = req.user; // ID du coach lié à l'adhérent (récupéré via authMiddleware)
    const { status, date } = req.query; // Option pour filtrer par statut ou date

    // Vérifiez que le coachId existe
    if (!coachId) {
      return res.status(400).json({ error: "Coach non associé à cet adhérent." });
    }

    // Construire le filtre MongoDB
    const filter = { coach: coachId };
    if (status) filter.status = status; // Exemple : "available" ou "reserved"
    if (date) filter.date = date; // Exemple : "2024-11-30"

    // Récupérer les créneaux
    const slots = await Slot.find(filter)
      .sort({ startTime: 1 })
      .populate('coach', 'firstName lastName email'); // Peupler les informations du coach

    if (!slots || slots.length === 0) {
      return res.status(404).json({ error: 'Aucun créneau disponible trouvé.' });
    }

    res.status(200).json(slots);
  } catch (error) {
    console.error('Erreur lors de la récupération des créneaux :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des créneaux.' });
  }
});

/**
 * Route pour récupérer tous les coaches (accessible uniquement aux adhérents).
 */
router.get('/coaches', authMiddleware, roleMiddleware(['adherent']), async (req, res) => {
  try {
    const coaches = await User.find({ role: 'coach' }).select('firstName lastName email');
    res.json(coaches);
  } catch (error) {
    console.error('Erreur lors de la récupération des coaches :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
