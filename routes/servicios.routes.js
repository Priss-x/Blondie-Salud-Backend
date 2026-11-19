
const express = require("express")
const router = express.Router()

const {listarServicios, crearServicio, actualizarServicio, eliminarServicio} = require("../controllers/servicios.controller")
const {verificarToken, permitirRoles} = require("../middlewares/auth.middleware")

router.get("/", listarServicios)
router.post("/", verificarToken, permitirRoles("admin"), crearServicio)
router.put("/:id", verificarToken, permitirRoles("admin"), actualizarServicio)
router.delete("/:id", verificarToken, permitirRoles("admin"), eliminarServicio)


/**
 * @swagger
 * /api/servicios:
 *   get:
 *     summary: Listar servicios médicos
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 *
 *   post:
 *     summary: Crear servicio médico
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 example: 18000
 *     responses:
 *       201:
 *         description: Servicio creado
 */

/**
 * @swagger
 * /api/servicios/{id}:
 *   put:
 *     summary: Modificar servicio médico
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 example: 18000
 *     responses:
 *       200:
 *         description: Servicio actualizado
 *
 *   delete:
 *     summary: Eliminar servicio médico
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio eliminado
 */

module.exports = router
