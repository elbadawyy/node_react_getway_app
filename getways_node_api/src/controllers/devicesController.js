import Device from "../models/Device.js"
import Getway from "../models/Getway.js"
import BaseController from "./BaseController.js"

class DeviceController extends BaseController {
    constructor(Model) {
      super(Model);

     


    }

   

    async createInGetway(req,res){
      let getway=await Getway.findOne({_id:req.params.getwayId})
      if (getway){
        const device=await Device.create({...req.body,getwayId:req.params.getwayId})
        this.linkDeviceToGetway(device._id,getway)  
        res.send(device)
  
      }else {
        res.status(404).json({ result: false,errorMsg:"getway not found" }) 
      }
    }

    async  linkDeviceToGetway(device_id,getway){
        Getway.update(
          { _id: getway._id }, 
          { $push: { devices: device_id } }
          
      );

      // getway.save()
      return getway 


    }
 
}

let devicesController = new DeviceController(Device);

export default devicesController
