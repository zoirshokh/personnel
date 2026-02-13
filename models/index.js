const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserModel = require("./user");
const WorkLogModel = require("./worklog");

const User = UserModel(sequelize, DataTypes);
const WorkLog = WorkLogModel(sequelize, DataTypes);

User.hasMany(WorkLog, { foreignKey: "userId" });
WorkLog.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, WorkLog };
