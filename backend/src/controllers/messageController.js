// backend/controllers/messageController.js
const messageService = require('../services/messageService');

class MessageController {
  async getMessages(req, res) {
    try {
      const messages = await messageService.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async sendMessage(req, res) {
    try {
      const { id:userId, username } = req.user;
      // console.log("req.user", req.user);
      const { content } = req.body;
      const message = await messageService.sendMessage(userId, username, content);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new MessageController();
