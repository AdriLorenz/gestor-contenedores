const express = require('express');
const { getElements, getElementById, addElement, updateElement, deleteElement } = require('../controllers/elements.controller');

const validate = require('../middleware/validation');
const { body, param } = require('express-validator');

const router = express.Router();

// GET de todos los elementos
router.get('/', getElements);

// GET de un elemento por ID
router.get(
    '/:id',
    validate([
        param('id').isNumeric().withMessage('El ID debe de ser un número')
    ]),
    getElementById
);

// POST elemento
router.post(
    '/',
    validate([
        body('name').notEmpty().withMessage('Nombre obligatorio'),
        body('lat').isFloat().withMessage('La latitud debe de ser un número'),
        body('lng').isFloat().withMessage('La longitud debe de ser un número'),
        body('associatedLocationId').isNumeric().withMessage('El ID de ubicación asociado debe ser un número')
    ]),
    addElement
);

// Actualizar elemento existente
router.patch(
    '/:id',
    validate([
        param('id').isNumeric().withMessage('El ID debe de ser un número'),
        body('name').optional().notEmpty().withMessage('Nombre obligatorio'),
        body('lat').optional().isFloat().withMessage('La latitud debe de ser un número'),
        body('lng').optional().isFloat().withMessage('La longitud debe de ser un número'),
        body('associatedLocationId').optional().isNumeric().withMessage('El ID de ubicación asociado debe ser un número'),
    ]),
    updateElement
);

// DELETE elemento
router.delete(
    '/:id',
    validate([
        param('id').isNumeric().withMessage('El ID debe de ser un número')
    ]),
    deleteElement
);

module.exports = router;