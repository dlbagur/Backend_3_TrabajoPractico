import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints de adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Lista todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                 - type: object
 *                   properties:
 *                     status: { type: string, example: "success" }
 *                     payload:
 *                       type: array
 *                       items:
 *                         type: object
 */
router.get('/', adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtiene una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *           example: "66b9f3d2c8c9a81234567890"
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                 - type: object
 *                   properties:
 *                     status: { type: string, example: "success" }
 *                     payload:
 *                       type: object
 *       404:
 *         description: Adopción no encontrada
 */
router.get('/:aid', adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crea una adopción a partir de los IDs de usuario y mascota
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *           example: "66b9f3d2c8c9a81234567890"
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *           example: "66b9f3d2c8c9a81234567891"
 *     responses:
 *       200:
 *         description: Adopción creada (la respuesta puede o no incluir el _id)
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                 - type: object
 *                   properties:
 *                     status: { type: string, example: "success" }
 *                     payload:
 *                       type: object
 *       400:
 *         description: Datos inválidos o entidades inexistentes
 */
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
