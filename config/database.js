const { Sequelize } = require("sequelize");
require("dotenv").config();

// Railway-da DATABASE_URL bo'lsa shundan foydalanadi, aks holda localga ulanadi
const sequelize = new Sequelize(process.env.DATABASE_URL || {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
}, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: process.env.DATABASE_URL ? {
      require: true,
      rejectUnauthorized: false // Railway bazasi uchun shart
    } : false
  },
  logging: false
});

module.exports = sequelize;