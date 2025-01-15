const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/elements.json');

// Lee los elementos del archivo
const readElements = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Guarda los elementos al archivo
const saveElements = (elements) => {
  fs.writeFileSync(dataPath, JSON.stringify(elements, null, 2));
};

// Obtiene todos los elementos
const getAllElements = () => {
  return readElements();
};

// Obtiene un elemento por ID
const getElementById = (id) => {
  const elements = readElements();
  return elements.find((elem) => elem.id === id);
};

// Agrega un nuevo elemento
const addNewElement = (newElement) => {
  const elements = readElements();
  elements.push(newElement);
  saveElements(elements);
  return newElement;
};

// Actualiza un elemento existente
const updateElement = (id, updatedData) => {
  const elements = readElements();
  const index = elements.findIndex((elem) => elem.id === id);
  
  if (index === -1) return null; // No encontrado
  
  elements[index] = { ...elements[index], ...updatedData };
  saveElements(elements);
  return elements[index];
};

// Elimina un elemento
const deleteElement = (id) => {
  const elements = readElements();
  const updatedElements = elements.filter((elem) => elem.id !== id);
  
  if (elements.length === updatedElements.length) return false; // No encontrado
  
  saveElements(updatedElements);
  return true;
};

module.exports = {
  getAllElements,
  getElementById,
  addNewElement,
  updateElement,
  deleteElement
};