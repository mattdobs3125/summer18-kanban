var expressSession = require("express-session");
var mongoStore = require("connect-mongodb-session")(expressSession);

var store = new mongoStore({
  uri: "mongodb://test:test123@ds020208.mlab.com:20208/canba", //CHANGE ME!!!!!!
  collection: "Sessions"
});

store.on("error", function (err) {
  console.log("[SESSION ERROR]", err);
});

// @ts-ignore
var session = expressSession({
  secret: "P37tEr 9!p3R P1c|(36 9i<K|3d p3qp3R2", //CHANGE ME!!!!
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
  },
  store,
  resave: true,
  saveUninitialized: true
});

module.exports = session;