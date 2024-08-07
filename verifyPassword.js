const bcrypt = require('bcrypt');

// La contraseña en texto plano que quieres verificar
const password = 'password123';

// El hash almacenado en la base de datos que quieres verificar
const hash = '$2b$10$bOW6AxHz9bsHAVkZuj/WqC9eB/VP9me/.tACIzU5z2He73P0nHsGm'; // Reemplaza con el hash almacenado en tu base de datos

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error('Error al comparar contraseñas:', err);
  } else {
    console.log('¿Las contraseñas coinciden?:', result);
  }
});
