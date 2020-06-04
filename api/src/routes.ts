import express from 'express';
import knex from './database/connection';
const routes = express.Router();

routes.get('/items', async (req, res) => { 
  const items = await knex('items').select('*');
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }; 
  });

  return res.json(serializedItems);
});

routes.post('/points', async (req, res) => {
  const { name, email, whatsapp, longitude, latitude, uf, city, items } = req.body;
  const trx = await knex.transaction();

  const inserted_ids = await trx('points').insert({
    image: 'fake-image',
    name,
    email,
    whatsapp,
    longitude,
    latitude,
    uf,
    city
  });

  const point_id = inserted_ids[0];
  const pointItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id,
    };
  });

  await trx('point_items').insert(pointItems);

  return res.json({ success: true });
});

export default routes;
