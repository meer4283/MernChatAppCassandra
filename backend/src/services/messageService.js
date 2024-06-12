const Message = require('../models/Message');
const messageRepository = require('../repositories/messageRepository');

class MessageService {
  async sendMessage(userId, username, content) {
    const message = new Message(userId, username, content);
    await messageRepository.createMessage(message);
    return message;
  }

  async getMessages() {
    return await messageRepository.getMessages();
  }
}

module.exports = new MessageService();
