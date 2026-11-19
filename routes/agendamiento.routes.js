
const express = require("express")
const router = express.Router()

const {agendarHora, agendarExamen, reagendarHora, cancelarHora, obtenerMisReservas} = require("../controllers/agendamientos.controller")
const {verificarToken, permitirRoles} = require("../middlewares/auth.middleware")

/**
 * @swagger
 * /api/agendamientos/mis-reservas:
 *   get:
 *     summary: Ver mis reservas
 *     tags: [Agendamientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservas del paciente
 */
router.get("/mis-reservas", verificarToken, permitirRoles("paciente"), obtenerMisReservas)
/**
 * @swagger
 * /api/agendamientos/horas:
 *   post:
 *     summary: Agendar hora médica
 *     tags: [Agendamientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Hora médica agendada correctamente
 */
router.post("/horas", verificarToken, permitirRoles("paciente"), agendarHora)
/**
 * @swagger
 * /api/agendamientos/examenes:
 *   post:
 *     summary: Agendar toma de muestras
 *     tags: [Agendamientos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Examen agendado correctamente
 */
router.post("/examenes", verificarToken, permitirRoles("paciente"), agendarExamen)
/**
 * @swagger
 * /api/agendamientos/horas/{numeroOrden}:
 *   put:
 *     summary: Reagendar hora médica
 *     tags: [Agendamientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroOrden
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hora médica reagendada correctamente
 */
router.put("/horas/:numeroOrden", verificarToken, permitirRoles("paciente"), reagendarHora)

/**
 * @swagger
 * /api/agendamientos/horas/{numeroOrden}/cancelar:
 *   patch:
 *     summary: Cancelar hora médica
 *     tags: [Agendamientos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroOrden
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200: 
 *          description: Hora médica cancelada correctamente
 */

router.patch("/horas/:numeroOrden/cancelar", verificarToken, permitirRoles("paciente"), cancelarHora)


module.exports = router
