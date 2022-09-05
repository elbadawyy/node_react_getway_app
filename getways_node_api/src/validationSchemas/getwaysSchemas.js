import yup from "yup"

export const getwayPostRequestSchema = yup.object({
  ip: yup.string().required().matches(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/),
  name: yup.string().required(),
  devices: yup.array().nullable()
   
  });

  export const getwayPutRequestSchema = yup.object({
    ip: yup.string().test('ip', "Please enter ip4 in right format 123.123.123.123", 
    function(value) {
        if(value){
          return /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(value)
        }else{
          return true
        }
    }),
    name: yup.string().max(100),
     
    });