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
    list.findById(req.params.id)
    .then(list=>{
        list.update(req.body,(err)=>{
            if(err){
                console.log(err)
                next()
                return
            }
            res.send("Sucessfully added")
        });
    })
    .catch(err=>{
        console.log(err)
        next()
    })
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