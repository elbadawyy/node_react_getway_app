import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container';
import Loader from "../common/Loader"

import DeleteGetwayDialog from "../common/DeleteGetwayDialog"
import DeleteDeviceDialog from "../common/DeleteDeviceDialog"
import EditGetwayDialog from "../common/EditGetwayDialog"
import AddDeviceDialog from "../common/AddDeviceDialog"

import {http} from "../../lib/axiosClient"

interface Device {
  uid: string;
  vendor: string;
  status: string;
}


const GetwayComponent = () => {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDeviceDelete, setopenDeviceDelete] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(true);
  const [openLoader, setopenLoader] = React.useState(false);
  const [devices, setdevices] = React.useState(Array<Device>);
  const [selectedDevice, setSelectedDevice] = React.useState({} as Device);
  const [addDeviceOpen, setAddDeviceOpen] = React.useState(false);


  const [getwayDetails, setGetwayDetails] = React.useState({
    _id: "",
    ip:"",
    name:"",
    devices: [
      {
        _id: "",
        uid: "",
        vendor: "",
        status: "online",
        createdAt: ""
      }
    ]
  });

  const { getwayId } = useParams();
  const navigate = useNavigate();

  const getGetwayInfo = async () => {
    setopenLoader(true);

    const getwayRes=await http.get("getways/"+getwayId)
    setGetwayDetails(getwayRes.data)

      console.log("getwayDetails.getwayDetails ",getwayDetails)
      setopenLoader(false);


  }



  
  const updateGetway = (row) => {
    console.log("update endpoint", row)
    http.put("getways/" + row._id, row).then(()=>{

      setEditOpen(false);
      getGetwayInfo();

    })
    


  }

  const deleteGetway = (row_id) => {
    http.delete("getways/" + row_id).then(()=>{
      setOpenDelete(false);
      navigate("/") 
    })
   
  }

  const deleteDevice = (row_id) => {
    http.delete("devices/" + row_id).then(()=>{
      setopenDeviceDelete(false);
      getGetwayInfo();
    })
   
  }


  const handleEdit = async () => {
    setEditOpen(true);

  }

  useEffect(  () => {
    
     getGetwayInfo()
  
  },[]);
  const handleDeleteGetway = ()=> {
    setOpenDelete(true);

  }


  const handleDeleteDevice = (row)=> {
    setSelectedDevice(row)
    setopenDeviceDelete(true);

  }
  const handleAddDevice = () => {
    setAddDeviceOpen(true);

  }



  return (
    <Box>

      {openLoader ? <Loader /> :

        <Card >

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {getwayDetails.name} Profile
            </Typography>




            <Table size="small" aria-label="purchases">
              <TableHead>
                Devices List
                <TableRow>
                  <TableCell>UID</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Delete</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {getwayDetails.devices.map((device) => (
                  <TableRow key={device._id}>
                    <TableCell>{device.uid}</TableCell>

                    <TableCell component="th" scope="row">
                      {device.vendor}
                    </TableCell>
                    <TableCell align="right">{device.createdAt}</TableCell>
                    <TableCell align="right">
                      {device.status}
                    </TableCell>
                    <TableCell align="right">
                    <Container>
                      <DeleteIcon 
                      
                      onClick={()=>{handleDeleteDevice(device)}} 
                      
                      />
                    </Container>
                      



                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>





          </CardContent>
          <CardActions>
            <Button onClick={ handleEdit }  size="small">Edit</Button>
            <Button onClick={handleDeleteGetway} size="small">Delete</Button>
            <Button onClick={handleAddDevice} size="small">Add New Device</Button>
          </CardActions>
        </Card>





      }
      <DeleteGetwayDialog
            setOpenDelete={setOpenDelete}
            openDelete={openDelete}
            // handleDelete={handleDelete}
            deleteGetway={deleteGetway}

            row={getwayDetails}
          />
          <DeleteDeviceDialog
            setOpenDeleteDevice={setopenDeviceDelete}
            openDeleteDevice={openDeviceDelete}
            // handleDelete={handleDelete}
            deleteDevice={deleteDevice}

            row={selectedDevice}
          />
          <EditGetwayDialog
            row={getwayDetails}
            editOpen={editOpen}
            handleOpenEdit={handleEdit}
            setEditOpen={setEditOpen}
            updateGetway={updateGetway}
          />
           <AddDeviceDialog
          handleAddDevice={handleAddDevice}
          setAddDeviceOpen={setAddDeviceOpen}
          addDeviceOpen={addDeviceOpen}
          getwayId={getwayDetails?._id}
          getGetwayInfo={getGetwayInfo}
          />

    </Box>
  )





}
export default GetwayComponent;