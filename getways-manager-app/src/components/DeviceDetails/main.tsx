import {
    useParams
  } from "react-router-dom";



const DeviceComponent = () => {

    return (<p>DeviceComponent {useParams().deviceId} </p>);
}
export default DeviceComponent;