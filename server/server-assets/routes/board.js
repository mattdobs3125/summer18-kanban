let router = require('express').Router()
let Boards = require('../models/board')
let Lists = require('../models/list')

//GET
//board/:boardId/lists
//finds 
router.get('/', (req, res, next) => {
  Boards.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
//create
//  route: /board
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Boards.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
//edit
//route: /board/:id
router.put('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})
router.get('/:boardId/list', (req, res, next) => {
  Lists.find({ boardId: req.params.boardId })
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(400).send(err)
          next()
      })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Boards.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Boards.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})


module.exports = router