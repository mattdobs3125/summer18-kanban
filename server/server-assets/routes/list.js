let router = require('express').Router()
let list = require('../models/list')




router.post('/',(req,res,next)=>{
    req.body.authorId = req.session.uid
    list.create(req.body)
        .then(newList => {
            res.send(newList)
        })
        .catch(err => {
            res.status(400).send(err)
        }
        )
})
router.put('/:id', (req, res, next) => {
    list.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('success'))
})


router.delete('/:id', (req, res, next) => {
    list.findById(req.params.id)
        .then(list => {
            list.findByIdAndRemove(req.params.id)
                .then(data => {
                    res.send('deleted')
                })
        })
})
module.exports = router