const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Youtube-DB-1", {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema mongoose
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// mongoose model

const User = mongoose.model("User", userSchema);

// ROUTES

app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find();
  return res.json(allDBUsers);
});

app.get("/users", async (req, res) => {
  const allDBUsers = await User.find();
  const html = `
    <ul>
    ${allDBUsers
      .map(
        (user) => `
    <li>${user.firstName}</li>
    <li>${user.email}</li>
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
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    // const user = req.find((user) => user.id === id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    // TODO : edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    // TODO : delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });

app.post("/api/users", async (req, res) => {
  // TODO: create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Please provide all the details" });
  }
  const result = await users.create({
    firstName: body.firstName,
    lastName: body.lastName,
    gender: body.gender,
    jobTitle: body.jobTitle,
    email: body.email,
  });
  console.log("result", result);
  return res.status(201).json({ status: "success", data: result });
});

app.listen(PORT, () => console.log(`Server is running on port :${PORT}`));
