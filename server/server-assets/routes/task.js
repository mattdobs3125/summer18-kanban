let router = require('express').Router()
let task = require('../models/task')

router.get('/:listId', (req, res, next) => {
    task.find({ listId: req.params.listId })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(400).send(err)
            next()

        })
})
router.post('/', (req, res, next) => {
    task.create(req.body)
        .then(newTask => {
            res.send(newTask)
        })
        .catch(err => {
            res.status(400).send(err)
            next()
        })
})
router.put("/:id", (req, res, next) => {
    task.findById(req.params.id)
        .then(task => {
            task.update(req.body, (err) => {
                if (err) {
                    res.status(400).send(err)
                    return
                }
                res.send("sucessful")
            });
        }
        )
        .catch(err => {
            res.status(400).send(err)
            next()
        })
})

router.delete('/:id', (req, res, next) => {
    list.findById(req.params.id)
        .then(task => {
            task.findByIdAndRemove(req.params.id)
                .then(data => {
                    res.send('removed')
                })
        })
})
module.exports = router