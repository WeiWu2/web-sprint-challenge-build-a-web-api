// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const actionMiddleware = require('./actions-middleware')
const router = express.Router()


router.get('/' ,(req,res, next) => {
    Actions.get()
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.get('/:id',actionMiddleware.checkID ,(req,res, next) => {
    Actions.get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.post('/',actionMiddleware.checkBody,(req,res,next) => {
    Actions.insert(req.body)
    .then((action) => {
        res.status(202).json(action)
    })
    .catch(next)
})

router.put('/:id',actionMiddleware.checkID,actionMiddleware.checkBody ,(req,res,next) => {
    Actions.update(req.params.id ,req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})


router.delete('/:id',actionMiddleware.checkID,(req,res,next) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.json()
    })
    .catch(next)
})


router.use((err,req,res,next) => { //eslint-disable-line
    res.status(500).json({
    message:err.message,
    stack: err.stack})
})
module.exports = router