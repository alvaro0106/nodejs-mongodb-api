const express = require("express");
const user = require("../models/user");
const userSchema = require("../models/user");   

const router = express.Router();

//create user 

/**
 * @swagger
 * components:
 *  schemas:
 *    user:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the user name
 *        age:
 *          type: integer
 *          description: the user age
 *        email:
 *          type: string
 *          description: the user email
 *      required:
 *         - name
 *         - age
 *         - email
 *      example:
 *         name: yo mero
 *         age: 25
 *         email: yomero@lion10.com        
 * 
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: create a new user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: new user created! 
 */
router.post('/users', (req, res)=>{
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error}));
});


// get all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: return all user
 *     tags: [user]
 *     responses:
 *       200:
 *         description: all user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */
router.get('/users', (req, res)=>{
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error}));
});

// get a user
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: return a user
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         shema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *         description: a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: user not found
 */
router.get('/users/:id', (req, res)=>{
    const { id } = req.params;
    userSchema
    .findById( id )
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error}));
});

// update a user
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: update a user
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         shema:
 *           type: string
 *         required: true
 *         description: the user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: user updated!
 *       400:
 *         description: user not found
 */
router.put('/users/:id', (req, res)=>{
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: {name, age, email} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error}));
});

// Delete a user
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: deleted a user
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         shema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *         description: user deleted
 *       400:
 *         description: user not found
 */
router.delete('/users/:id', (req, res)=>{
    const { id } = req.params;
    userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error}));
});


module.exports = router;