import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { styled } from '@mui/material/styles';

import "./App.css";
import Home from "./components/Home/main"
import GetwayDetails from "./components/GetwayDetails/main"
import DeviceDetails from "./components/DeviceDetails/main"
import AddGetway from "./components/AddGetway/main"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';



class App extends Component {
  render() {
    return (
      <Container>
        <Grid>




        </Grid>
       

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/getway-details/:getwayId" element={<GetwayDetails />} />
          <Route path="/device-details/:deviceId" element={<DeviceDetails />} />
          <Route path="/add-getway" element={<AddGetway />} />
        </Routes>

      </Container>

    )
  }
}

export default App;
