// api/orders.js

import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cook_fabric',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { name, email, adresse, bäckerei, cart } = data;

    const query = 'INSERT INTO orders (name, email, adresse, bäckerei, produkte) VALUES (?, ?, ?, ?, ?)';
    const products = cart.map(p => `${p.name} x${p.qty} (${(p.qty * p.price).toFixed(2)} €)`).join('\n');

    connection.query(query, [name, email, adresse, bäckerei, products], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Speichern der Bestellung.' });
      }
      res.status(200).json({ message: 'Bestellung gespeichert!' });
    });
  } else if (req.method === 'GET') {
    connection.query('SELECT * FROM orders', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Fehler beim Abrufen der Bestellungen.' });
      }
      res.status(200).json({ orders: results });
    });
  }
}
