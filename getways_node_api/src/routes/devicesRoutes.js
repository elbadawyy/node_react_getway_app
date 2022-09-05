import express from 'express'

import schemaValidator from "../middlewares/requestValidator.js"
import { devicePostRequestSchema,devicePutRequestSchema } from "../validationSchemas/devicesSchemas.js"
import devicesController from "../controllers/devicesController.js"

var router = express.Router();

router.get('/', await async function (req, res) {
    devicesController.index(req, res)
});
router.post('/:getwayId', await schemaValidator(devicePostRequestSchema), async function (req, res) {
    await devicesController.createInGetway(req, res)
});

router.put('/:id', await schemaValidator(devicePutRequestSchema), async function (req, res) {
    await devicesController.update(req, res)
});

router.delete('/:id', async function (req, res) {
    await devicesController.destroy(req, res)
});


export default router
