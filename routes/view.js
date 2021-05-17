const express = require("express");
const router = express.Router();
const client = require("./mysql");
const session = require("express-session");
const moment = require("moment");

const attraction = [
  "Alice in Wonderland",
  "Buzz Lightyear Astro Blasters",
  "Circus Train",
  "Dumbo the Flying Elephant",
  "Incredicoster",
  "Riverboat",
];

router.post("/:id/write", function (req, res, next) {
  const body = req.body;
  const id = req.params.id;
  const nick = req.session.nick;
  const comment = body.comment;

  client.query(
    "select * from comments; INSERT INTO comments (attraction, nick, comment) VALUES (?, ?, ?)",
    [id, nick, comment],
    function () {
      res.redirect("/view/" + id);
    }
  );
});

router.get("/:id/delete/:num", function (req, res, next) {
  const id = req.params.id;
  const num = req.params.num;
  client.query(
    "DELETE FROM comments WHERE num = ?",
    [num],
    function (err, data) {
      res.redirect("/view/" + id);
    }
  );
});
router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const nick = req.session.nick;

  client.query(
    "SELECT * FROM comments WHERE attraction = ?",
    [id],
    function (err, data) {
      res.render("view", {
        title: attraction[id - 1],
        id: id,
        data: data,
        nick: nick,
        logined: true,
        update: false,
        moment: moment,
      });
    }
  );
});
router.get("/:id/update/:num", function (req, res, next) {
  const id = req.params.id;
  const num = req.params.num;
  const nick = req.session.nick;
  client.query(
    "SELECT * FROM comments WHERE attraction = ?",
    [id],
    function (err, data) {
      console.log("이미지 아이디 받아야 해!", id);
      res.render("view", {
        title: attraction[id - 1],
        data: data,
        nick: nick,
        id: id,
        num: num,
        logined: true,
        update: true,
        moment: moment,
      });
    }
  );
});

router.post("/:id/submit/:num", function (req, res, next) {
  const num = req.params.num;
  const id = req.params.id;
  const comment = req.body.updateComment;
  //const nick = req.session.nick;
  client.query(
    "UPDATE comments SET comment = ? WHERE num =?",
    [comment, num],
    function (err, data) {
      res.redirect("/view/" + id);
    }
  );
});

module.exports = router;
