const express = require("express");

const router = express.Router();
const {handleAllGetUser, handleGetUserByID, handleUpdateUserById, handleDeleteUserbyID, handleCreateUser,} = require("../controller/user")


router.route("/")
.get(handleAllGetUser)
.post(handleCreateUser)

router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserbyID);

module.exports = router;