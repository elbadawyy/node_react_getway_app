
import BaseModel from "./BaseModel.js";
import DeviceMongooseModel from "../db/DeviceMongooseModel.js"

let DeviceModel=new BaseModel(DeviceMongooseModel)
export default DeviceModel