import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();

// Use 127.0.0.1 to bypass your Ubuntu proxy
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  // This matches the service name 'db' in your docker-compose
  connectionString: "postgresql://user_local:password_local@db:5432/my_local_db"
});

// Route to receive data from React and save to Postgres
app.post('/api/sync-user', async (req, res) => {
  const { uid, email, nome, cpf, dataNascimento } = req.body;
  
  try {
    const query = `
      INSERT INTO users (id, email, name, cpf, birth_date) 
      VALUES ($1, $2, $3, $4, $5) 
      ON CONFLICT (email) DO UPDATE SET name = $3;
    `;
    await pool.query(query, [uid, email, nome, cpf, dataNascimento]);
    
    console.log(`User ${email} synced to PostgreSQL`);
    res.status(200).json({ message: "Synced to DBeaver successfully" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Failed to save to database" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend Bridge running on http://127.0.0.1:${PORT}`);
});