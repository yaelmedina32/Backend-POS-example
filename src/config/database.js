const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, '../../inventory.db');

let db;

const getDb = async () => {
  if (db) return db;
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  return db;
};

const initDatabase = async () => {
  const database = await getDb();
  
  // Create Users table
  await database.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      usuarioId INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      fechaAlta DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Inventory table
  await database.exec(`
    CREATE TABLE IF NOT EXISTS inventario (
      inventarioId INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo TEXT NOT NULL,
      marca TEXT NOT NULL,
      nombreProducto TEXT NOT NULL,
      fechaAlta DATETIME DEFAULT CURRENT_TIMESTAMP,
      stock INTEGER NOT NULL DEFAULT 0
    )
  `);

  // Seed admin user if not exists
  const adminExists = await database.get('SELECT * FROM usuarios WHERE login = ?', 'admin');
  
  if (!adminExists) {
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin', 10);
    
    await database.run(
      'INSERT INTO usuarios (login, password) VALUES (?, ?)',
      'admin', hashedPassword
    );
    
    console.log('Admin user created successfully.');
  }
};

module.exports = {
  getDb,
  initDatabase
};
