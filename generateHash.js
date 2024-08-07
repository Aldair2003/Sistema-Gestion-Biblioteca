const bcrypt = require('bcrypt');

const password = 'password123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
  } else {
    console.log('Hash generado:', hash);
  }
});
