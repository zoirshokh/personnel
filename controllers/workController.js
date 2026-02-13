const { WorkLog, User } = require("../models");

// Ish boshlash
const startWork = async (req, res) => {
  try {
    const { workName, userId } = req.body; // userId frontenddan yuboriladi

    const work = await WorkLog.create({
      workName,
      startTime: new Date(),
      userId,
    });

    res.json(work);
  } catch {
    res.status(500).json({ message: "Ish boshlanmadi" });
  }
};

// Ish tugatish
const endWork = async (req, res) => {
  try {
    const work = await WorkLog.findByPk(req.params.id);

    if (!work)
      return res.status(404).json({ message: "Topilmadi" });

    const end = new Date();
    const diffMs = end - work.startTime;
    const minutes = Math.floor(diffMs / 60000);

    work.endTime = end;
    work.durationMinutes = minutes;

    await work.save();

    res.json(work);
  } catch {
    res.status(500).json({ message: "Ish tugamadi" });
  }
};

// Mening ishlarim
const myWorks = async (req, res) => {
  const { userId } = req.query;

  const works = await WorkLog.findAll({
    where: { userId },
  });

  res.json(works);
};

// Barcha ishlar (admin)
const allWorks = async (req, res) => {
  const works = await WorkLog.findAll({
    include: [{ model: User, attributes: ["id", "name"] }],
  });

  res.json(works);
};

// Statistika (admin)
const stats = async (req, res) => {
  const total = await WorkLog.count();
  const active = await WorkLog.count({ where: { endTime: null } });

  res.json({ total, active });
};

module.exports = { startWork, endWork, myWorks, allWorks, stats };
