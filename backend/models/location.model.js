const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/locations.json');

// Lee las ubicaciones del archivo
const readLocations = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Guarda las ubicaciones al archivo
const saveLocations = (locations) => {
  fs.writeFileSync(dataPath, JSON.stringify(locations, null, 2));
};

// Obtiene todas las ubicaciones
const getAllLocations = () => {
  return readLocations();
};

// Obtiene una ubicación por ID
const getLocationById = (id) => {
    const locations = readLocations();
    return locations.find((loc) => loc.id === id);
  };

// Agrega una nueva ubicación
const addNewLocation = (newLocation) => {
  const locations = readLocations();
  locations.push(newLocation);
  saveLocations(locations);
  return newLocation;
};

// Actualiza una ubicación existente
const updateLocation = (id, updatedData) => {
  const locations = readLocations();
  const index = locations.findIndex((loc) => loc.id === id);
  
  if (index === -1) return null; // No encontrado
  
  locations[index] = { ...locations[index], ...updatedData };
  saveLocations(locations);
  return locations[index];
};

// Elimina una ubicación
const deleteLocation = (id) => {
  const locations = readLocations();
  const updatedLocations = locations.filter((loc) => loc.id !== id);
  
  if (locations.length === updatedLocations.length) return false; // No encontrado
  
  saveLocations(updatedLocations);
  return true;
};

module.exports = {
  getAllLocations,
  getLocationById,
  addNewLocation,
  updateLocation,
  deleteLocation
};