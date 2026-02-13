const express = require("express");
const router = express.Router();

const workController = require("../controllers/workController");
const admin = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: WorkLogs
 *   description: Ishchilar ish faoliyati loglari
 */

/**
 * @swagger
 * /work/start:
 *   post:
 *     summary: Ish boshlash
 *     tags: [WorkLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workName
 *               - userId
 *             properties:
 *               workName:
 *                 type: string
 *                 example: Stol yasash
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Ish muvaffaqiyatli boshlandi
 */
router.post("/start", workController.startWork);

/**
 * @swagger
 * /work/end/{id}:
 *   put:
 *     summary: Ishni tugatish
 *     tags: [WorkLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tugatiladigan ish IDsi
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ish tugatildi va vaqt hisoblandi
 *       404:
 *         description: Ish topilmadi
 */
router.put("/end/:id", workController.endWork);

/**
 * @swagger
 * /work/my:
 *   get:
 *     summary: Mening ishlarim
 *     tags: [WorkLogs]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: Foydalanuvchi IDsi
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Foydalanuvchi ishlar ro'yxati
 */
router.get("/my", workController.myWorks);

/**
 * @swagger
 * /work/all:
 *   get:
 *     summary: Barcha ishlar (faqat admin)
 *     tags: [WorkLogs]
 *     parameters:
 *       - in: header
 *         name: adminkey
 *         required: true
 *         description: Admin kaliti
 *         schema:
 *           type: string
 *           example: superadmin123
 *     responses:
 *       200:
 *         description: Barcha ishlar ro'yxati
 *       403:
 *         description: Faqat admin kirishi mumkin
 */
router.get("/all", admin, workController.allWorks);

/**
 * @swagger
 * /work/stats:
 *   get:
 *     summary: Ish statistikasi (faqat admin)
 *     tags: [WorkLogs]
 *     parameters:
 *       - in: header
 *         name: adminkey
 *         required: true
 *         description: Admin kaliti
 *         schema:
 *           type: string
 *           example: superadmin123
 *     responses:
 *       200:
 *         description: Ish statistikasi
 *       403:
 *         description: Faqat admin kirishi mumkin
 */
router.get("/stats", admin, workController.stats);

module.exports = router;
