import express from 'express';
import cors from 'cors';
import { pool, initDb } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/proposals', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM proposals ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/proposals', async (req, res) => {
  const data = req.body;
  const { rows } = await pool.query(
    `INSERT INTO proposals (title, region, designer, price, image, description, customer_request, detailed_plan)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      data.title,
      data.region,
      data.designer,
      data.price,
      data.image,
      data.description,
      data.customerRequest || {},
      data.detailedPlan || {}
    ]
  );
  res.json(rows[0]);
});

app.get('/api/guides', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM guides ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/guides', async (req, res) => {
  const g = req.body;
  const { rows } = await pool.query(
    `INSERT INTO guides (name, region, role, phone, memo) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [g.name, g.region, g.role, g.phone, g.memo]
  );
  res.json(rows[0]);
});

app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users_crm ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/users', async (req, res) => {
  const u = req.body;
  const { rows } = await pool.query(
    `INSERT INTO users_crm (name, type, contact, request) VALUES ($1,$2,$3,$4) RETURNING *`,
    [u.name, u.type, u.contact, u.request]
  );
  res.json(rows[0]);
});

app.listen(PORT, async () => {
  await initDb();
  console.log(`Server running on ${PORT}`);
});
