const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userRepository = require('../repositories/userRepository');

class UserService {
  async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(username, hashedPassword);
    await userRepository.createUser(user);
    return user;
  }

  async authenticate(username, password) {
    const user = await userRepository.getUserByUsername(username);
    if (!user) throw new Error('User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey');
    return { user, token };
  }
}

module.exports = new UserService();
