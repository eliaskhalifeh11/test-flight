const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors()); // allow your React app to access this API

const config = {
  user: 'your_sql_user',
  password: 'your_password',
  server: 'your_server_address',
  database: 'your_database_name',
  options: {
    encrypt: true, // or false depending on your setup
    trustServerCertificate: true, // for local dev
  },
};

// Your locations endpoint here:
app.get('/api/locations', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT DISTINCT city FROM Airports ORDER BY city`;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
