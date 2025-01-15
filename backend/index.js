const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar rutas
const locationRoutes = require('./routes/locations.routes');
const elementRoutes = require('./routes/elements.routes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Uso de rutas
app.use('/api/locations', locationRoutes);
// app.use('/api/elements', elementRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo ha fallado', error: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  
module.exports = app;