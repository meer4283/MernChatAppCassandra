const client = require('../database');
class UserRepository {
  async createUser(user) {
    const query = 'INSERT INTO users (id, username, password) VALUES (?, ?, ?)';
    await client.execute(query, [user.id, user.username, user.password], { prepare: true });
  }

  async getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const result = await client.execute(query, [username], { prepare: true });
    return result.rows[0];
  }
}

module.exports = new UserRepository();
