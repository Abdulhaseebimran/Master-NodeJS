const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const {connect} = require("./connection")
const {logReqRes} = require("./middlewares/index")

const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes);

// ROUTES
app.use("/api/users", userRouter);

// Connect to MongoDB
connect("mongodb://127.0.0.1:27017/Youtube-DB-1")
.then(() => console.log("MongoDB Connected"));

app.listen(PORT, () => console.log(`Server is running on port :${PORT}`));
