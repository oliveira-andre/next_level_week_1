import express from 'express';

const app = express();

const users = [
  'Andre',
  'Oliveira',
  'Teste',
];

app.get('/users', (req, res) => { 
  return res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users[id];

  return res.json(user);
});

app.post('/users', (req, res) => {
  const user = { name: 'Andre Oliveira', email: 'root@root.com' };

  return res.json(user);
});

app.listen(3333);
