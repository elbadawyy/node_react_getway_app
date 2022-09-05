export default class BaseModel{
    mongooseModel
    constructor(MongooseModel){
        this.mongooseModel=MongooseModel
    }

    async create(item){
        // try {
            return await this.mongooseModel.create(item);

        // }catch(e){
        //     console.log("errr ",e.message)
        //     return {result:false,errorMsg:e.message}
        // }
    }

    async create(item){
        // try {
            return await this.mongooseModel.create(item);

        // }catch(e){
        //     console.log("errr ",e.message)
        //     return {result:false,errorMsg:e.message}
        // }
    }

    async all( includeFrom=[]) {

      
        if(includeFrom?.length>0){
            return this.mongooseModel.find().populate(includeFrom).exec();

        }else{
            return this.mongooseModel.find().exec();
        }
    }

    async findOne(cond={}, includeFrom=[]) {
        if(includeFrom?.length>0){
            return this.mongooseModel.findOne(cond).populate(includeFrom).exec();

        }else{
            return this.mongooseModel.findOne(cond).exec();
        }
    }



    async update(id, newitem) {
        // return this.model.create(item);
        return this.mongooseModel.findByIdAndUpdate(id, newitem, { new: true }).exec();
    }

    async deleteById(id) {
        // return this.model.create(item);
        return this.mongooseModel.deleteOne({ _id: id }).exec();
    }

    

}