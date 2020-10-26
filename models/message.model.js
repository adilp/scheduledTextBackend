const sql = require("./db.js");

// constructor
const Message = function (Message) {
  this.userId = Message.userId;
  this.message = Message.message;
  this.status = Message.status;
};

Message.create = (newMessage, result) => {
  sql.query("INSERT INTO Messages SET ?", newMessage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Message: ", { id: res.insertId, ...newMessage });
    result(null, { id: res.insertId, ...newMessage });
  });
};

Message.findById = (MessageId, result) => {
  sql.query(`SELECT * FROM Messages WHERE id = ${MessageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Message: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Message with the id
    result({ kind: "not_found" }, null);
  });
};

Message.findByUserId = (UserId, result) => {
  sql.query(`SELECT * FROM Messages WHERE UserID = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Messages: ", res);
    result(null, res);
  });
};

Message.getAll = (result) => {
  sql.query("SELECT * FROM Messages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Messages: ", res);
    result(null, res);
  });
};

Message.updateById = (id, Message, result) => {
  sql.query(
    "UPDATE Messages SET userId = ?, message = ?, status = ? WHERE id = ?",
    [Message.userId, Message.message, Message.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Message with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Message: ", { id: id, ...Message });
      result(null, { id: id, ...Message });
    }
  );
};

Message.remove = (id, result) => {
  sql.query(
    "UPDATE Messages SET status = ? WHERE id = ?",
    [Message.deletedAt, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Message with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted Message with id: ", id);
      result(null, res);
    }
  );
};

Message.removeAll = (result) => {
  sql.query("DELETE FROM Messages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Messages`);
    result(null, res);
  });
};

module.exports = Message;
