const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    next();
})

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    next();
});

// ROUTES

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) => `<li>${user.id}</li>
    <li>${user.first_name}</li>
    <li>${user.last_name}</li>
    <li>${user.gender}</li>
    <li>${user.email}</li>
    <li>${user.job_title}</li>
    `
      )
      .join("")}
    </ul>
    `;
  res.send(html);
});

// Get user with id
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = req.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO : edit user with id
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);
    users[index] = { ...user, ...body };
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success" });
    });
  })
  .delete((req, res) => {
    // TODO : delete user with id
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);
    users.splice(index, 1);
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success" });
    });
  });

app.post("/api/users", (req, res) => {
  // TODO: create new user
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || body.email || body.job_title || body.gender){
    return res.status(400).json({status: "fail", message: "Please provide all the details"});
  }
  users.push({...body, id: users.length + 1});
  fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: id.length});
  });
});

app.listen(PORT, () => console.log(`Server is running on port :${PORT}`));
