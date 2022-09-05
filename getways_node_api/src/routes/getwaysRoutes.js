import express from 'express'

import schemaValidator from "../middlewares/requestValidator.js"
import { getwayPostRequestSchema,getwayPutRequestSchema } from "../validationSchemas/getwaysSchemas.js"
import getwaysController from "../controllers/getwayController.js"

var router = express.Router();

router.get('/', async function (req, res) {
    await getwaysController.index(req, res)
});

router.get('/:id', async function (req, res) {
    await getwaysController.show(req, res)
});

router.post('/', await schemaValidator(getwayPostRequestSchema), async function (req, res) {
    await getwaysController.createGetway(req, res)
});

router.put('/:id', await schemaValidator(getwayPutRequestSchema), async function (req, res) {
    await getwaysController.update(req, res)
});

router.delete('/:id', async function (req, res) {
    await getwaysController.destroy(req, res)
});
export default router
