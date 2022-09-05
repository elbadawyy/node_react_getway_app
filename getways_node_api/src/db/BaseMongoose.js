export default class BaseMongoose  {

    mongoseModel

    constructor(Model ) {
        this.mongoseModel = Model;
    }

 

    async find(cond={}, fields={},options={}, sortOptions={}) {

        console.log( "yeeeees")
        return []
        // let query = this.model.find(cond, fields, options);
        // if (sortOptions) query = query.sort(sortOptions);
        // return query.exec();

    }

    async findOne(cond, fields, options) {
        return await this.model.findOne(cond, fields, options).exec();
    }

    async create(item) {
        return await this.model.create(item);
    }

    // async update(id: ObjectId, newitem: T): Promise<T> {
    //     // return this.model.create(item);
    //     return <Promise<T>>this.model.findByIdAndUpdate(id, newitem, { new: true }).exec();
    // }

    // async upsert(id: ObjectId, item: T): Promise<T> {

    //     // return this.model.create(item);
    //     return <Promise<T>>this.model.findByIdAndUpdate(id, item, { new: true, upsert: true }).exec();
    // }

    // listAll(): Promise<T> {
    //     return this.model.create(item);
    // }
}