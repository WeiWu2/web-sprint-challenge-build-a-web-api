const Projects = require('./projects-model')


const checkID = (req,res,next) => {
    Projects.get(req.params.id)
    .then((action) => {
        if(!action)
            res.status(404).json({message:`projects with id ${req.params.id} does not exist`})
        else
            {
                next()
            }
        
    })
    .catch((error) => {
        next(error)

    })
}
const checkBody = (req,res,next) => {
    if(!req.body.name || !req.body.description)
        res.status(400).json({message:'missing required fields'})
    else
    next()
}

module.exports = {
    checkID,
    checkBody
}