const { validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    // ejecutamos las validaciones de forma asíncrona
    await Promise.all(validations.map(validation => validation.run(req)));

    // Obtener los errores de validación
    const errors = validationResult(req);

    // Si encuentra algún error, devuelve un mensaje de error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    // Si no hay errores, continua
    next();
  };
};

module.exports = validate;