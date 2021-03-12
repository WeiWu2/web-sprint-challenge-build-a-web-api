const Actions = require('./actions-model')



const checkID = (req,res,next) => {
    Actions.get(req.params.id)
    .then((action) => {
        if(!action)
            res.status(404).json({message:`action with id ${req.params.id} does not exist`})
        else
            next()
    })
    .catch((error) => {
        next(error)

    })
}

const checkBody = (req,res,next) => {
    
    if(!req.body.project_id || !req.body.description || !req.body.notes)
        res.status(400).json({message:'missing required fields'})
    else 
    next()
}


module.exports = {
    checkID,
    checkBody
}