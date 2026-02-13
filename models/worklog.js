module.exports = (sequelize, DataTypes) => {
  const WorkLog = sequelize.define("WorkLog", {
    workName: DataTypes.STRING,

    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,

    durationMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    userId: DataTypes.INTEGER,
  });

  return WorkLog;
};
