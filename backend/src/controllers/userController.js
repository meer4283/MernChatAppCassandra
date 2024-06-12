// backend/controllers/userController.js
const userService = require('../services/userService');

class UserController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const data = await userService.authenticate(username, password);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
