import Getway from "../models/Getway.js"
import Device from "../models/Device.js"
import BaseController from "./BaseController.js"

class GetwayController extends BaseController {
  constructor(Model) {
    super(Model);
  }
  async createGetway(req, res) {
    try {

      let getway = await Getway.create({ ip: req.body.ip, name: req.body.name });
      const devices = req.body.devices?.map(function (device) {
        device.getwayId = getway._id
        return device
      }) || []
      if (devices.length > 0) {
        const devicesDocs = await Device.create(devices)
        getway.devices = devicesDocs.map((doc) => doc._id);
        await getway.save()
      }
      // send 201 created
      res.status(201).json(getway)
    } catch (e) {
      res.send({ result: false, errorMsg: e.message })
    }
  }


  // overriwte BaseController show method to include getway devices
  async show(req, res) {
    try {
      res.send(await this.model.findOne({ _id: req.params.id }, ["devices"]))
    } catch (e) {
      res.send({ result: false, errorMsg: e.message })
    }
  }
  // overriwte BaseController index method to include getway devices
  async index(req, res) {
    try {
      res.send(await this.model.all( ["devices"] ))
    } catch (e) {
      res.send({ result: false, errorMsg: e.message })
    }
  }
}
let getwayController = new GetwayController(Getway);

export default getwayController
