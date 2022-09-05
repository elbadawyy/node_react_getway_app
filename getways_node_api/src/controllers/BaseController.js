export default class BaseController {

    constructor(Model) {
        this.model = Model
    }



    async index(req, res) {
        res.send(await this.model.all())

    }

    async create(req, res) {
        try {
            res.send(await this.model.create(req.body))

        } catch (e) {
            res.send({ result: false, errorMsg: e.message })
        }
    }

    async update(req, res) {
        try {
            res.send(await this.model.update(req.params.id,req.body))

        } catch (e) {
            res.send({ result: false, errorMsg: e.message })
        }
    }

    async destroy(req, res) {
        try {
            await this.model.deleteById(req.params.id );
            res.status(201).send()

        } catch (e) {
            res.send({ result: false, errorMsg: e.message })
        }
    }

    async show(req, res) {
        try {
            let result = await this.model.findOne({ _id: req.params.id });
            if (result)
                res.send(result)
            else
                res.status(404).json({ result: false, errorMsg: "id(" + req.params.id + ") not found" })

        } catch (e) {
            res.send({ result: false, errorMsg: e.message })
        }
    }

}