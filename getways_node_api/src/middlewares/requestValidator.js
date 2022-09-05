import yup from "yup"


export default async function validateSchema(validationSchema){

    return async function (req,res,nextFunction) {
        try {
            await validationSchema.validate(req.body)
            nextFunction()
        }catch(e){
            res.send({result:false,errorMsg:e.message})
        }
    }


}