import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66b9f3d2c8c9a81234567890"
 *         first_name:
 *           type: string
 *           example: "María"
 *         last_name:
 *           type: string
 *           example: "García"
 *         email:
 *           type: string
 *           format: email
 *           example: "maria@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: "user"
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *       required: [first_name, last_name, email]
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     status: { type: string, example: "success" }
 *                     payload:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 */
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name: { type: string, example: "Juan" }
 *               last_name:  { type: string, example: "Pérez" }
 *               email:      { type: string, example: "juan@example.com" }
 *               password:   { type: string, example: "secret" }
 *               role:       { type: string, enum: [user, admin], example: "user" }
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     status: { type: string, example: "success" }
 *                     payload: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Datos inválidos
 */
router.post('/', usersController.createUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     status: { type: string, example: "success" }
 *                     payload:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:uid', usersController.getUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { first_name: "Juana" }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:uid', usersController.updateUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:uid', usersController.deleteUser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Elimina todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Cantidad de usuarios eliminados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: "success" }
 *                 deletedCount: { type: integer, example: 12 }
 *       500:
 *         description: Error del servidor
 */
router.delete('/', usersController.deleteAllUsers);

export default router;
