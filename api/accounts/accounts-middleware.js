const db = require('../../data/db-config')
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400}
  const {name, budget} = req.body
 if (name === undefined || budget === undefined) {
  error.message =  "name and budget are required"
 } else if (name.trim().length < 3 || name.trim().length > 100) {
  error.message = "name of account must be between 3 and 100" 
 }else  if (typeof name !== 'string') {
  error.message = "account name must be a string"
 }else if (typeof budget !== 'number' || isNaN(budget)) {
  error.message = "budget of account must be a number"
 } else if (budget > 1000000 || budget < 0 ) {
  error.message = "budget of account is too large or too small" 
 } 

 if (error.message) {
  next(error)
 } else {
  next()
 }
 
 }

exports.checkAccountNameUnique = (req, res, next) => {
db('accounts').where('name', req.body.name.trim())
  .then(resp => {
   if (resp.length >= 1) {
    res.status(400).json({message: "name is taken"}) 
   } else { next(); 
  }}).catch(err => { next(err)})
}
 


exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
  .then(account => {
    if (!account) {
      res.status(404).json({ message: 'account not found'})
    }else {
      req.account = account
       next(); 
} }).catch(err => 
    res.status(500).json('Internal Service Error'))

}
