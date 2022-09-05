import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { getwaySchema } from '../../validationSchemas/AddGetwaySchema'

export default function FormDialog(props: { handleOpenEdit, setEditOpen, editOpen, updateGetway, row }) {
  const { handleOpenEdit, setEditOpen, editOpen, updateGetway, row } = props;

 
  const handleClose = () => {
    setEditOpen(false);
  };

  const handleSubmit = (values) => {

    props.updateGetway({ ip: values.ip, name: values.name,_id:row._id })


    setEditOpen(false);
  };
  interface Values {
    name: string;
    ip: string;
  }

  console.log("row in dialog ",row)

  return (


    <Formik
      initialValues={{
        ip: row?.ip,
        name: row?.name
      }}

      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {

      }}

      validationSchema={getwaySchema}
    >
      {(formik) => {
        let { errors, touched, isValid, dirty, values } = formik;
  
        // const name = row.name
        return (

          <Form>

            <Dialog open={editOpen} onClose={handleClose} >
              <DialogTitle>Update Getway Details</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  New Getway Name
                </DialogContentText>
                <Field
                  type="text"
                  label="Getway Name"
                  variant="filled"
                  name="name"
                  className={errors.name && "input-error"}

                />
                {errors.name && (
                  <span className="error">{errors.name}</span>
                )}


                <DialogContentText>
                  New IP Address
                </DialogContentText>
                <Field type="text" name="ip"
                  className={errors.ip && "input-error"}
                  
                />
                {errors.ip && touched.ip ? (
                  <div>{errors.ip}</div>
                ) : null}



                {errors.ip && (
                  <span className="error">{errors.ip}</span>
                )}

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