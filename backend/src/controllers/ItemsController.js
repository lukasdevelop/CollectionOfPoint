import connection from '../database/connection'

const index = async (req, res) => {
  const items = await connection('items').select('*')
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`
    }
  })

  return res.json(serializedItems)
}

export default {
  index
}

