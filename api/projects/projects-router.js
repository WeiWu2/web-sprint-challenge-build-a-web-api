const express = require('express')
const Projects = require('./projects-model')
const projectsMiddleWare = require('./projects-middleware')
const router = express.Router();

router.get('/:id/actions',projectsMiddleWare.checkID ,(req,res,next) => {
    Projects.getProjectActions(req.params.id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)

})

router.get('/' ,(req,res,next) => {
    Projects.get()
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})
router.get('/:id',projectsMiddleWare.checkID,(req,res,next) => {
    Projects.get(req.params.id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})
router.post('/',projectsMiddleWare.checkBody,(req,res,next) => {
    Projects.insert(req.body)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})
router.put('/:id',projectsMiddleWare.checkID, projectsMiddleWare.checkBody,(req,res,next) => {
    Projects.update(req.params.id ,req.body)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.delete('/:id',projectsMiddleWare.checkID,(req,res,next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json()
    })
    .catch(next)
})




router.use((err,req,res,next) => { //eslint-disable-line
    res.status(500).json({
    message:err.message,
    stack: err.stack})
})
module.exports = router