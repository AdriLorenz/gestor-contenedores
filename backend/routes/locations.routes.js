const express = require('express');
const { getLocations, getLocationById, addLocation, updateLocation, deleteLocation } = require('../controllers/locations.controller');

const validate = require('../middleware/validation');
const { body, param } = require('express-validator');

const router = express.Router();

// GET de todas las ubicaciones
router.get('/', getLocations);

// GET de una ubicación por ID
router.get(
    '/:id',
    validate([
        param('id').isNumeric().withMessage('El ID debe de ser un número')
    ]),
    getLocationById
);

// POST ubicación
router.post(
    '/',
    validate([
        body('name').notEmpty().withMessage('Nombre obligatorio'),
        body('lat').isFloat().withMessage('La latitud debe de ser un número'),
        body('lng').isFloat().withMessage('La longitud debe de ser un número')
    ]),
    addLocation
);

// Actualizar ubicación existente
router.patch(
    '/:id',
    validate([
        param('id').isNumeric().withMessage('El ID debe de ser un número'),
        body('name').optional().notEmpty().withMessage('Nombre obligatorio'),
        body('lat').optional().isFloat().withMessage('La latitud debe de ser un número'),
        body('lng').optional().isFloat().withMessage('La longitud debe de ser un número'),
    ]),
    updateLocation
);

// DELETE ubicación
router.delete(
    '/:id',
    validate([
        param('id').isNumeric().withMessage('El ID debe de ser un número')
    ]),
    deleteLocation
);

module.exports = router;