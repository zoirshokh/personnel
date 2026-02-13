const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");
const setupSwagger = require("./swagger/swagger"); // <-- qo‘shiladi

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app); // <-- MUHIM QATOR

app.use("/auth", require("./routes/authRoute"));
app.use("/work", require("./routes/workRoute"));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server ishladi");
  });
});
