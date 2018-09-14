let router = require("express").Router();
let task = require("../models/task");

router.delete("*", (req, res, next) => {
  console.log("task delete request");
  next();
});

router.get("/", (req, res, next) => {
  task
    .find({ author: req.session.uid })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send(err);
      next();
    });
});
//makes a new task
router.post("/", (req, res, next) => {
  req.body.author = req.session.uid;
  task
    .create(req.body)
    .then(newTask => {
      res.send(newTask);
    })
    .catch(err => {
      res.status(400).send(err);
      next();
    });
});
router.put("/:id", (req, res, next) => {
  task
    .findById(req.params.id)
    .then(task => {
      task.update(req.body, err => {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.send("successful");
      });
    })
    .catch(err => {
      res.status(400).send(err);
      next();
    });
});

router.delete("/:id", (req, res, next) => {
  task.findByIdAndRemove(req.params.id).then(data => {
    res.send("removed");
  });
});

//comments
router.get("/:idTask/commments", (req, res, next) => {
  task
    .findById(req.params.taskId)
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post("/:idTask/comments", (req, res, next) => {
  task
    .findByIdAndUpdate(
      req.params.idTask,
      { $push: { comments: req.body } },
      { new: true }
    )
    .then(t => {
      res.status(200).send(t);
    })
    .catch(err => {
      res.status(400).send(err);
      next();
    });
});
router.delete("/:taskId/comments/:commentId", (req, res, next) => {
  console.log("comment remove request");
  task.findById(req.params.taskId).then(task => {
    task.comments.id(req.params.commentId).remove();
    task.save(err => {
      if (err) {
        res.status(400).send(err);
      }
      return res.send(task);
    });
  });
});

module.exports = router;
