let router = require('express').Router()
let list = require('../models/list')

router.get('/:boardId',(req,res,next)=>{
list.find({boardId: req.params.body})
.then(data=>{
    res.send(data)
})
.catch(err=>{
    console.log(err)
    next()
})
})



router.post('/',(req,res,next)=>{
    req.body.authorId = req.session.uid
    req.body.boardId = req.params.boardId
    list.create(req.body)
    .then(newList=>{
        res.send(newList)
    })
    .catch(err=>{
    console.log(err)
    next()
    }
    )
})
router.put('/:id',(req,res,next)=>{
    list.findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.send('success'))
})


router.delete('/:id',(req,res,next)=>{
    list.findById(req.params.id)
    .then(list=>{
    lit.findByIdAndRemove(req.params.id)
    .then(data=>{
        res.send('deleted')
    })  
    })
})
module.exports = router