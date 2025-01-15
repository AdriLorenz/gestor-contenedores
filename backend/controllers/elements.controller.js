const Element = require('../models/element.model');

// Obtener todos los elementos
const getElements = (req, res) => {
  const elements = Element.getAllElements();
  res.status(200).json(elements);
};

// Obtener un elemento por ID
const getElementById = (req, res) => {
  const element = Element.getElementById(parseInt(req.params.id));
  
  if (!element) {
    return res.status(404).json({ message: 'Elemento no encontrado' });
  }

  res.status(200).json(element);
};

// Agregar un nuevo elemento
const addElement = (req, res) => {
  const newElement = { id: Date.now(), ...req.body };
  const addedElement = Element.addNewElement(newElement);
  res.status(201).json(addedElement);
};

// Actualizar un elemento existente
const updateElement = (req, res) => {
  const updatedElement = Element.updateElement(parseInt(req.params.id), req.body);
  
  if (!updatedElement) {
    return res.status(404).json({ message: 'Elemento no encontrado' });
  }
  
  res.status(200).json(updatedElement);
};

// Eliminar un elemento
const deleteElement = (req, res) => {
  const success = Element.deleteElement(parseInt(req.params.id));
  
  if (!success) {
    return res.status(404).json({ message: 'Elemento no encontrado' });
  }

  res.status(200).json({ message: 'Elemento eliminado con éxito' });
};

module.exports = { 
  getElements, 
  getElementById, 
  addElement, 
  updateElement, 
  deleteElement 
};