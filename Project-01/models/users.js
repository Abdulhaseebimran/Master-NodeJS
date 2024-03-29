const mongoose = require("mongoose");

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

module.exports = User;