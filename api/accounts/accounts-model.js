const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

async function create(account) {
  const id = await db('accounts').insert(account)
  return await getById(id)
}

async function updateById (id, changes) {
  await db('accounts').where({id}).update(changes)
  return getById(id)
}

async function deleteById (id) {
  const result = await getById(id)
  await db('accounts').where('id', id).delete()
  return result
}



module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}