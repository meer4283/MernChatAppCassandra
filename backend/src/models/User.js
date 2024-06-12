const { v4: uuidv4 } = require('uuid');
class User {
  constructor(username, password) {
    this.id = uuidv4();
    this.username = username;
    this.password = password;
  }
}

module.exports = User;
