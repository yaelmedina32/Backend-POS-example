const { getDb } = require('../config/database');
const AppError = require('../utils/AppError');

exports.getAllInventory = async () => {
  const db = await getDb();
  return await db.all('SELECT * FROM inventario');
};

exports.getInventoryById = async (id) => {
  const db = await getDb();
  const item = await db.get('SELECT * FROM inventario WHERE inventarioId = ?', id);
  if (!item) {
    throw new AppError('No inventory item found with that ID', 404);
  }
  return item;
};

exports.createInventoryItem = async (data) => {
  const db = await getDb();
  const { modelo, marca, nombreProducto, stock } = data;

  const result = await db.run(
    `INSERT INTO inventario (modelo, marca, nombreProducto, stock)
     VALUES (?, ?, ?, ?)`,
    modelo, marca, nombreProducto, stock
  );

  return {
    inventarioId: result.lastID,
    modelo,
    marca,
    nombreProducto,
    stock,
    fechaAlta: new Date().toISOString() // Or fetch the row again
  };
};

exports.updateInventoryItem = async (id, data) => {
  const db = await getDb();
  
  // Check if item exists first
  await exports.getInventoryById(id);

  const updates = [];
  const values = [];

  if (data.modelo !== undefined) {
    updates.push('modelo = ?');
    values.push(data.modelo);
  }
  if (data.marca !== undefined) {
    updates.push('marca = ?');
    values.push(data.marca);
  }
  if (data.nombreProducto !== undefined) {
    updates.push('nombreProducto = ?');
    values.push(data.nombreProducto);
  }
  if (data.stock !== undefined) {
    updates.push('stock = ?');
    values.push(data.stock);
  }

  if (updates.length === 0) {
    throw new AppError('No data provided to update', 400);
  }

  values.push(id);

  const query = `UPDATE inventario SET ${updates.join(', ')} WHERE inventarioId = ?`;
  
  await db.run(query, ...values);

  return await exports.getInventoryById(id);
};

exports.deleteInventoryItem = async (id) => {
  const db = await getDb();
  const result = await db.run('DELETE FROM inventario WHERE inventarioId = ?', id);

  if (result.changes === 0) {
    throw new AppError('No inventory item found with that ID', 404);
  }
};
