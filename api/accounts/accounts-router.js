const router = require('express').Router()
const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(result=> {
    res.status(200).json(result)})
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create({"name": req.body.name.trim(), "budget": req.body.budget})
  .then(resp => {
    res.status(201).json(resp)
}).catch(err => {
  res.status(500).json({message: err.message})
})
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
  .then(resp => {
    res.status(200).json(resp)
  }).catch(err => 
    res.status(500).json({message: err.message, 
    stack: err.stack}))
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(resp => {
    res.status(200).json(resp)
  }).catch(err => {
    res.status(500).json(err)
  })

})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
