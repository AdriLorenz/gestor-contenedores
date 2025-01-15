const Ubicacion = require('../models/location.model');

// Obtener todas las ubicaciones
const getLocations = (req, res) => {
  const locations = Ubicacion.getAllLocations();
  res.status(200).json(locations);
};

// Obtener una ubicación por ID
const getLocationById = (req, res) => {
  const location = Ubicacion.getLocationById(parseInt(req.params.id));
  
  if (!location) {
    return res.status(404).json({ message: 'Ubicación no encontrada' });
  }

  res.status(200).json(location);
};

// Agregar una nueva ubicación
const addLocation = (req, res) => {
  const newLocation = { id: Date.now(), ...req.body };
  const addedLocation = Ubicacion.addNewLocation(newLocation);
  res.status(201).json(addedLocation);
};

// Actualizar una ubicación
const updateLocation = (req, res) => {
  const updatedLocation = Ubicacion.updateLocation(parseInt(req.params.id), req.body);
  
  if (!updatedLocation) {
    return res.status(404).json({ message: 'Ubicación no encontrada' });
  }
  
  res.status(200).json(updatedLocation);
};

// Eliminar una ubicación
const deleteLocation = (req, res) => {
  const success = Ubicacion.deleteLocation(parseInt(req.params.id));
  
  if (!success) {
    return res.status(404).json({ message: 'Ubicación no encontrada' });
  }

  res.status(200).json({ message: 'Ubicación eliminada con éxito' });
};

module.exports = { getLocations, getLocationById, addLocation, updateLocation, deleteLocation };