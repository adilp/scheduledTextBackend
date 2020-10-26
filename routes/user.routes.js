module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const messages = require("../controllers/messages.controller.js");

  // Create a new Customer
  app.post("/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single Customer with customerId
  app.get("/users/:UserId", users.findOne);

  // Update a Customer with customerId
  app.put("/users/:UserId", users.update);

  // Delete a Customer with customerId
  app.delete("/users/:UserId", users.delete);

  // Create a new Customer
  app.delete("/users", users.deleteAll);

  //Create new list
  app.post("/messages", messages.create);

  //Retrieve all messages for user
  app.get("/messages/:UserId", messages.findAllByUserId);

  app.get("/send/:UserId", users.send);
};
