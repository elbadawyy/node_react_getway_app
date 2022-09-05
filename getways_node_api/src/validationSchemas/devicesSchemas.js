import yup from "yup"

export const devicePostRequestSchema = yup.object({
  uid: yup.string().required(),
  vendor: yup.string().required(),
  status: yup.string().oneOf(['offline', 'online']),
   
  });

  export const devicePutRequestSchema = yup.object({
    uid: yup.string().nullable(),
    vendor: yup.string().nullable(),
    status: yup.string().oneOf(['offline', 'online']),
     
    });