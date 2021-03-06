const Message = require("../models/Message.model.js");

// Create and Save a new Message
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    console.log("createMessage: ", req.body);
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Message
  const message = new Message({
    userId: req.body.userId,
    message: req.body.message,
    status: req.body.status,
  });

  // Save Message in the database
  Message.create(message, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    else res.send(data);
  });
};

// Retrieve all Messages from the database.
exports.findAll = (req, res) => {
  Message.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages.",
      });
    else res.send(data);
  });
};

// Retrieve all Messages by User Id.
exports.findAllByUserId = (req, res) => {
  Message.findByUserId(req.params.UserId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Message with id ${req.params.UserId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Message with id " + req.params.UserId,
        });
      }
    } else res.send(data);
  });
};

// Find a single Message with a MessageId
exports.findOne = (req, res) => {
  Message.findById(req.params.messageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Message with id ${req.params.messageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Message with id " + req.params.messageId,
        });
      }
    } else res.send(data);
  });
};

// Update a Message identified by the MessageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Message.updateById(
    req.params.messageId,
    new Message(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Message with id ${req.params.messageId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Message with id " + req.params.messageId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Message with the specified MessageId in the request
exports.delete = (req, res) => {
  Message.remove(req.params.messageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Message with id ${req.params.messageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Message with id " + req.params.messageId,
        });
      }
    } else res.send({ message: `Message was deleted successfully!` });
  });
};

// Delete all Messages from the database.
exports.deleteAll = (req, res) => {
  Message.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Messages.",
      });
    else res.send({ message: `All Messages were deleted successfully!` });
  });
};
