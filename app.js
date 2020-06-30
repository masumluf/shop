const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

require("dotenv").config();
app.use(bodyParser.json());

//app middleware

app.use(morgan("dev"));
//app.use(cors())

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `http://localhost:3000` }));
}

app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);

//import db
require("./DB/index");

app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
