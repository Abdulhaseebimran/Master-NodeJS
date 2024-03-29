const User = require("../models/users");

async function handleAllGetUser(req, res) {
  const allDBUsers = await User.find();
  return res.json(allDBUsers);
}

async function handleGetUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "success" });
}

async function handleDeleteUserbyID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleCreateUser(req, res) {
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
}

module.exports = {
  handleAllGetUser,
  handleGetUserByID,
  handleUpdateUserById,
  handleDeleteUserbyID,
  handleCreateUser,
};
