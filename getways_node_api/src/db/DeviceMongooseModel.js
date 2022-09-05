import  mongoose  from 'mongoose';
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  getwayId: {type: mongoose.Schema.Types.ObjectId, ref: 'Getway'},

  vendor: {type: String, required: true, max: 100},
  uid: {type: String, required: true, max: 100},
  status: {
        type: String,
        enum: {
          values: ['online', 'offline'],
          message: '{VALUE} is not supported'
        }
      },
},{ timestamps: true });


// Export the model
 let DeviceMongooseModel = mongoose.model('Device', DeviceSchema);

 export default DeviceMongooseModel