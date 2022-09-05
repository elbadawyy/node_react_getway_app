import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { deviceSchema } from '../../validationSchemas/AddGetwaySchema'

import { http } from "../../lib/axiosClient"

export default function FormDialog(props: { handleAddDevice, addDeviceOpen, setAddDeviceOpen, getwayId, getGetwayInfo }) {
  const [status, setStatus] = React.useState("online");
  const { handleAddDevice, addDeviceOpen, setAddDeviceOpen, getwayId } = props;

  const handleClickOpen = () => {
    setAddDeviceOpen(true);
  };

  const handleClose = () => {
    setAddDeviceOpen(false);
  };

  const handlechange = (event) => {
    setStatus(event.target.value)
  }

  const handleSubmit = (values) => {
    console.log("before before ", values)
    http.post("devices/" + getwayId, { uid: values.uid, vendor: values.vendor, status: values.status }).then(() => {
      props.getGetwayInfo()
      setAddDeviceOpen(false);

    })
  }


  return (


    <Formik
      initialValues={{
        uid: '',
        vendor: '',
        status: "online"
      }}

      onSubmit={(values, { setSubmitting }) => {

      }}

      validationSchema={deviceSchema}
    >
      {(formik) => {
        let { errors, touched, isValid, dirty, values } = formik;

        // const name = row.name
        return (

          <Form>

            <Dialog open={addDeviceOpen} onClose={handleClose} >
              <DialogTitle>Add New Device To Getway</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  UID
                </DialogContentText>
                <Field
                  type="text"
                  label="Getway Name"
                  variant="filled"
                  name="uid"
                  className={errors.uid && "input-error"}

                />
                {errors.uid && (
                  <span className="error">{errors.uid}</span>
                )}


                <DialogContentText>
                  Vendor
                </DialogContentText>
                <Field type="text" name="vendor"
                  className={errors.vendor && "input-error"}

                />
                {errors.vendor && touched.vendor ? (
                  <div>{errors.vendor}</div>
                ) : null}



                {errors.vendor && (
                  <span className="error">{errors.vendor}</span>
                )}
                <label htmlFor="email" style={{ display: "block" }}>
                  Color
                </label>
                <select
                  name="status"
                  value={values.status}
                  onChange={handlechange}
                  // onBlur={handleBlur}
                  style={{ display: "block" }}
                >
                  <option value="online" label="online">
                    online
                  </option>

                  <option value="offline" label="offline">
                    green
                  </option>
                </select>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={() => { handleSubmit(values) }} >Update</Button>
              </DialogActions>
            </Dialog>

          </Form>)
      }}
    </Formik>
  );
}