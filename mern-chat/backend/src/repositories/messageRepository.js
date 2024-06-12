const client = require('../database');

class MessageRepository {
  async createMessage(message) {
    const query = 'INSERT INTO messages (id, userId, username, content, timestamp) VALUES (?, ?, ?, ?, ?)';
    await client.execute(query, [message.id, message.userId, message.username, message.content, message.timestamp], { prepare: true });
  }

  async getMessages(limit = 50) {
    const query = 'SELECT * FROM messages LIMIT ?';
    const result = await client.execute(query, [limit], { prepare: true });
    return result.rows;
  }
}

module.exports = new MessageRepository();
