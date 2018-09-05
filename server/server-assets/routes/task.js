let router = require('express').Router()
let task = require('../models/task')

router.get('/',(req,res,next)=>{
    task.find({listId: req.params.body})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        consaole.log(err)
        next()

    })
})
router.post('/',(req,res,next)=>{
    task.create(req.body)
    .then(newTask=>{
        res.send(newTask)
    })
    .catch(err=>{
        console.log(err)
        next()
    })
})
router.put("/:id",(req,res,next)=>{
    task.findById(req.params.id)
    .then(task=>{
        task.update(req.body,(err)=>{
            if(err){
                console.log(err)
                next()
                return
            }
            res.send("sucessful")
        });
    }
    )
    .catch(err=>{
        console.log(err)
        next()
    })
})

router.delete('/:id',(req,res,next)=>{
    list.findById(req.params.id)
    .then(task=>{
        task.findByIdAndRemove(req.params.id)
        .then(data=>{
            res.send('removed')
        })
    })
})
module.exports = router