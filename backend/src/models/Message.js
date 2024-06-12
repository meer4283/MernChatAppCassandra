const { v4: uuidv4 } = require('uuid');

class Message {
  constructor(userId, username, content) {
    this.id = uuidv4();
    this.userId = userId;
    this.username = username;
    this.content = content;
    this.timestamp = new Date();
  }
}

module.exports = Message;
