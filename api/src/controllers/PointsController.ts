import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async create (req: Request, res: Response) {
    const { name, email, whatsapp, longitude, latitude, uf, city, items } = req.body;
    const trx = await knex.transaction();
    const point = {
      image: 'fake-image',
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