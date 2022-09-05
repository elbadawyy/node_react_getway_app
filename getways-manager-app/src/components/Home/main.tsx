import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


//component
import GetwayRow from "./GetwayRow"
import DeleteGetwayDialog from "../common/DeleteGetwayDialog"
import EditGetwayDialog from "../common/EditGetwayDialog"

import Loader from "../common/Loader"

import { http } from "../../lib/axiosClient"


function createData(
  _id: string,
  name: string,
  ip: string,
) {
  return {
    _id,
    name,
    ip,
    devices: [
      {
        _id: "1231231",
        uid: '2020',
        vendor: 'vendor',
        date: 3,
        status: "online",
      },
      {
        _id: "12312sas31",

        uid: '2020',
        vendor: 'vendor',
        date: 3,
        status: "online",
      },
    ],
  };
}




export default function CollapsibleTable() {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [openLoader, setopenLoader] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState();

  

  const [rows, setRows] = React.useState([
   
  ]);

  const handleDelete = (row) => {
    setActiveRow(row)
    setOpenDelete(true);

  }


  const handleEdit = (row) => {
    setActiveRow(row)
    console.log("handleEdit", row)
    setEditOpen(true);

  }

  const updateGetway = (row) => {
    console.log("update endpoint", row)
    http.put("getways/" + row._id, row).then(()=>{

      setEditOpen(false);
    getGetways();

    })
    


  }

  const deleteGetway = (row_id) => {
    http.delete("getways/" + row_id).then(()=>{
      setOpenDelete(false);
      getGetways();
    })
   


  }

  const getGetways = () => {
    setopenLoader(true);

    http.get("getways").then(function (response) {
      setRows(response.data)
      setopenLoader(false);
    });
  }

  useEffect(() => {
    getGetways();
  }, []);


  return (
    <Box>
      {openLoader ? <Loader /> :
        <Grid container spacing={2}>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell >Getway Name</TableCell>
                  <TableCell align="right">IP</TableCell>
                  <TableCell align="right">Devices No.</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <GetwayRow key={(row as any)._id} row={row}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}

                  />
                ))}



              </TableBody>
            </Table>
          </TableContainer>
          <DeleteGetwayDialog
            setOpenDelete={setOpenDelete}
            openDelete={openDelete}
            // handleDelete={handleDelete}
            deleteGetway={deleteGetway}

            row={activeRow}
          />
          <EditGetwayDialog
            row={activeRow}
            editOpen={editOpen}
            handleOpenEdit={handleEdit}
            setEditOpen={setEditOpen}
            updateGetway={updateGetway}
          />
         

        </Grid>
      }
    </Box>
  );
}
