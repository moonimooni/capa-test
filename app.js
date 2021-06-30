const express = require("express");
const cors = require("cors");
const app = express();

const errorController = require("./middlewares/error");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(errorController.errorLogger);
app.use(errorController.errorHandler);

app.listen(8080, () => {
  console.log("port 8080 on");
});
