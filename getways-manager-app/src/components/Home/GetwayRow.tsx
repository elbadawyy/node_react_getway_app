import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';


import DeleteGetwayDialog from "../common/DeleteGetwayDialog"



export default function Row(props: { row,handleDelete ,handleEdit,editOpen,setEditOpen}) {
  const { row ,handleDelete,handleEdit,editOpen,setEditOpen} = props;
  const [openArrow, setOpenArrow] = React.useState(false);

  return (
    <React.Fragment>
      
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenArrow(!openArrow)}
          >
            {openArrow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        <Link  to={"getway-details/"+row._id}>
          {row.name}
        </Link>
        
        </TableCell>
        <TableCell align="right">{row.ip}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        {/* action cell */}
        <TableCell align="right">

          {/* <Button variant="contained" color="success">
              Success
            </Button> */}
          <Container>
            <DeleteIcon onClick={()=>{ props.handleDelete(row) } } />
            <EditIcon  onClick={()=>{ props.handleEdit(row) } } />
            <Link  to={"getway-details/"+row._id}>
   
            <PreviewIcon />
            </Link>
          </Container>





        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openArrow} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Devices List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>UID</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.devices.map((device) => (
                    <TableRow key={device._id}>
                    <TableCell>{device.uid}</TableCell>

                      <TableCell component="th" scope="row">
                        {device.vendor}
                      </TableCell>
                      <TableCell align="right">{device.createdAt}</TableCell>
                      <TableCell align="right">
                        {device.status }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}