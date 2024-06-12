const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'chat_app'
});

client.connect((err) => {
  if (err) console.error('Failed to connect to Cassandra', err);
  else console.log('Connected to Cassandra');
});

module.exports = client;
