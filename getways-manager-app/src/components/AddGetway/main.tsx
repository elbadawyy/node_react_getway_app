import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import NativeSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import { deviceSchema, getwaySchema } from '../../validationSchemas/AddGetwaySchema'
import { http } from "../../lib/axiosClient"
import Loader from "../common/Loader"

interface Values {
  name: string;
  ip: string;
}

interface Device {
  uid: string;
  vendor: string;
  status: string;
}



export default function FormPropsTextFields() {
  const [uid, setUid] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [status, setstatus] = React.useState("online");
  const [devices, setdevices] = React.useState(Array<Device>);
  const [openLoader, setopenLoader] = React.useState(false);


  const handleUidChange = (event) => {
    setUid(event.target.value)

  }

  const handleVendorChange = (event) => {
    setVendor(event.target.value)

  }

  const handleStatusChange = (event) => {
    setstatus(event.target.value)

  }

  const includeDevice = () => {
    try {
      deviceSchema.validateSync({ uid, vendor, status })
      setUid("")
      setVendor("")
      setstatus("online")
      setdevices([...devices, { uid, vendor, status }])
    } catch (e) {
      alert("error " + e)
    }
  }

  return (
    openLoader ? <Loader /> : 
    <Formik
      initialValues={{
        ip:'',
        name:''
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {

        console.log(values)  
        http.post("getways", {
          ip:values.ip,
          name:values.name,
          devices
        })

        alert("uuuu")

      }}

      validationSchema={getwaySchema}
      >
      {(formik) => {
        const { errors, touched, isValid, dirty ,values} = formik;
        return (

        <Form>



          <Box
            sx={{ flexGrow: 1 }}
          >

            <Grid container >
              <Grid item xs={3}>

                <Field
                  type="text" 
                    id="name"
                    label="Getway Name"
                    variant="filled"
                    name="name"
                    className={errors.name && "input-error"}
                    
                  
                  />
                {errors.name && (
            <span className="error">{errors.name}</span>
          )}



              </Grid>

              <Grid item xs={4}>
                <Field type="text" name="ip" 
                className={errors.ip && "input-error"}

                />
                {errors.ip && touched.ip ? (
                  <div>{errors.ip}</div>
                ) : null}
              </Grid>

            </Grid>

            <br />
            Include Devices
            <br />

            {devices.map((device) => (
              <Grid container >
                <Grid item xs={2}>

                  <TextField
                    disabled
                    id="filled-disabled"
                    label="UID"
                    defaultValue={device.uid}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Vendor"
                    defaultValue={device.vendor}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={1}>
                  <TextField disabled id="select" label="Status*" value={device.status} select>
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="offline">Offline</MenuItem>
                  </TextField>
                </Grid>

              </Grid>

            ))}
            <Grid>

              <br />
              <TextField
                label="UID"
                value={uid}
                onChange={handleUidChange}
              />

              <TextField
                label="Vendor"
                value={vendor}
                onChange={handleVendorChange}
              />

              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={"online"}>online</MenuItem>
                <MenuItem value={"offline"}>offline</MenuItem>
              </Select>
            </Grid>


            <Button variant="contained" color="success" onClick={includeDevice}>
              +
            </Button>

            <br />
            <Button variant="contained" color="success" type='submit'>
              Add Getway
            </Button>

          </Box>

        </Form>

       );
      }}
    </Formik>
  );
};