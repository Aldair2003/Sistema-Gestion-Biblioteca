const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(username, email, hashedPassword);
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Intentando iniciar sesión con email: ${email}`);
    const user = await User.findByEmail(email);
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    console.log('Usuario encontrado:', user);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Comparando contraseñas: ${password} vs ${user.password}`);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    console.log('Contraseña correcta');
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login exitoso');
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.log('Error en el login:', error.message);
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};
