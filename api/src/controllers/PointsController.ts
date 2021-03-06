import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index (req: Request, res: Response) {
    const { city, uf, items } = req.query;
    const parsedItems = String(items).split(',').map(item => Number(item.trim()));
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return res.json(points);
  };

  async create (req: Request, res: Response) {
    const { name, email, whatsapp, longitude, latitude, uf, city, items } = req.body;
    const trx = await knex.transaction();
    const point = {
      image: 'https://images.unsplash.com/photo-1591199571558-25db3c59609f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      uf,
      city
    };

    const inserted_ids = await trx('points').insert(point);

    const point_id = inserted_ids[0];
    const pointItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx('point_items').insert(pointItems);
    await trx.commit();

    return res.json({
      id: point_id,
      ...point
    });
  };

  async show (req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex('points').where('id', id).first();

    if(!point) {
      return res.status(400).json({ message: 'Point not found' });
    };

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point, items });
  };
};

export default PointsController;
