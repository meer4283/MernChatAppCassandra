
## Docker Setup

To deploy this project run

```bash
  docker pull cassandra:latest
```
```bash
  docker run --name cassandra -d -p 9042:9042 cassandra:latest
```
```bash
  winpty docker exec -it cassandra bash
```
```bash
  cqlsh
```
```bash
  CREATE KEYSPACE chat_app WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE chat_app;

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    userId UUID,
    username TEXT,
    content TEXT,
    timestamp TIMESTAMP
);
```


## Backend Setup

To deploy backend this project run

```bash
  cd backend
``` 
```bash
  npm install
```
```bash
  node server.js
```
## Frontend Setup
copy .env.default to .env
To deploy front this project run

```bash
  cd frontend
``` 
```bash
  npm install
```
```bash
  npm run dev
```