import connection from '../database/connection'

const create = async (req, res) => {
  const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body

  const point = {
    image: 'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80', name, email, whatsapp, latitude, longitude, city, uf

  }

  const trx = await connection.transaction()

  const insertedIds = await trx('points').insert(point)

  const point_id = insertedIds[0]

  const pointItems = items.map((item_id) => {
    return {
      item_id,
      point_id
    }
  })
  await trx('points_items').insert(pointItems)

  await trx.commit()

  return res.json({
    id: point_id,
    ...point,
  })
}

const show = async (req, res ) => {
  const { id } = req.params;
  try {
    const point = await connection('points').where('id', '=', id).first()

    const items = await connection('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id)
      .select('items.title')

    return res.json({point, items})

  } catch (error) {
    return res.status(400).send({error})
  }  
}

const index = async(req, res) => {
  const {city, uf, items } = req.query
  const parsedItems = items.split(',').map(item => item.trim())
  const points = await connection('points')
    .join('points_items', 'points.id', '=', 'points_items.point_id')
    .whereIn('points_items.item_id', parsedItems)
    .where('city', city)
    .where('uf', uf)
    .distinct()
    .select('points.*')


  return res.json(points)

}

export default {
  create,
  show,
  index
}

