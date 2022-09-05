import * as Yup from "yup";

// export default Yup.object({
// ip: Yup.string().required().matches(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/),
// name: Yup.string().required(),
    // devices: Yup.array().nullable()

    // });

export const getwaySchema= Yup.object().shape({
    name: Yup.string().required(),
    ip: Yup.string().required().matches(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/),
});

export const deviceSchema= Yup.object().shape({
    uid: Yup.string().required(),
    vendor: Yup.string().required(),
    status: Yup.string().oneOf(['offline', 'online']),
});
