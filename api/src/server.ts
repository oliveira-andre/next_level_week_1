import express from 'express';

const app = express();

app.get('/users', (req, res) => { 
  return res.json({ ok: true });
});

app.post('/users', (req, res) => {
  const user = { name: 'Andre Oliveira', email: 'root@root.com' };

  return res.json(user);
});

app.listen(3333);
