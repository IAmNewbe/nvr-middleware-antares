import React, { useState } from "react";
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Alert
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Server from "@/data/conf";
 
export default function NVRForm() {
  const [type, setType] = React.useState("card");
  const [tesNVRData, setTesNVRData] = useState({
    server: '',
    port: '',
    username: '',  
    password: '',
    prefix: '',
  });
  const [tesFTPData, setTesFTPData] = useState({
    ftp_url: '',
    ftp_port: 21,
    ftp_user: '',
    ftp_pass: '',
    ftp_dir: '',
    send_interval: 5000,
    status: '',
  });
  const [inputData, setInputData] = useState(
    {
      name: '',
      server: '',
      port: '',
      username: '',  
      password: '',
      prefix: '',
      ftp_url: '',
      ftp_port: '',
      ftp_user: '',
      ftp_pass: '',
      ftp_dir: '',
      send_interval: 5000,
      status: '',
    }
  );
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [redAlertTes, setRedAlertTes] = React.useState(false);
  const [greenAlertTes, setGreenAlertTes] = React.useState(false);
  const [redAlertPost, setRedAlertPost] = React.useState(false);
  const [greenAlertPost, setGreenAlertPost] = React.useState(false);
  const backEndUrl = Server.baseURL;
  const backEndPort = Server.basePort;
  const backEndPath = '/postTaskById';
  const backEndTestPath = '/test-fetch-image';
  const testFtpPath = '/test-upload-image';

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTesNVRData({
      ...tesNVRData,
      [name]: value
    });
    setTesFTPData({
      ...tesFTPData,
      [name]: value
    });
    setInputData({
      ...inputData,
      [name]: value
    });
  };

  const handleFetchImage = async (e) => {
    e.preventDefault();
    console.log("Tes Image: ");
    console.log(tesNVRData);
    try {
      const response = await axios.post(`http://${backEndUrl}:${backEndPort}${backEndTestPath}`, tesNVRData, {
        responseType: 'blob'});

      const imageUrl = URL.createObjectURL(response.data);
      setLoading(false); // Convert the response blob to a URL
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
      setLoading(true);
    }
  };

  const handleSendImage = async (e) => {
    e.preventDefault();
    
    const fullUrl = `http://${backEndUrl}:${backEndPort}${testFtpPath}`;

    console.log("back end:",fullUrl);
    const dataToSend = {
      data: inputData,
    };
    console.log(dataToSend)

    fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response)
      .then(data => {
        console.log("response : ", data.statusText);
        setResponseMessage(`Server status: ${data.status}, ${data.statusText}`);
        setLoading(false);
        if (data.status !== 200 && data.status !== 201) {
          setRedAlertTes(true);
        } else {
          setGreenAlertTes(true);
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
        setResponseMessage('Error sending data');
        // setLoading(true);
        setRedAlertTes(true);
      });
  };

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const fullUrl = `http://${backEndUrl}:${backEndPort}${backEndPath}`;

    console.log("back end:",fullUrl);
    const dataToSend = {
      data: inputData,
    };

    fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        setResponseMessage(`Server response: ${data.message}`);
        setSuccess(true);
        setGreenAlertPost(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error sending data:', error);
        setResponseMessage('Error sending data');
        setSuccess(false);
        setLoading(false);
        setRedAlertPost(true);
      });
  };
 
  return (
    <Card className="w-full mt-5 md:mt-10">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center bg-orange-600 shadow-sm"
      >
        
        <Typography variant="h4" color="white">
          Add New Task
        </Typography>

        <div className="mb-4 h-20 p-6 text-white">
          <CreditCardIcon className="h-10 w-10 text-white mx-auto" />
          {type === "card" ? (
            <h2 className="font-bold text-white">NVR CONFIGURATION</h2>
          ) : (
            <h2 className="font-bold text-white">FTP CONFIGURATION</h2>
            // <img alt="paypal " className="w-14 " src="https://docs.material-tailwind.com/icons/paypall.png" />
          )}
        </div>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab value="card" onClick={() => setType("card")}>
              NVR API Credentials
            </Tab>
            <Tab value="paypal" onClick={() => setType("paypal")}>
              FTP API Credentials
            </Tab>
          </TabsHeader>
            
            <form className="mt-12 block lg:flex" onSubmit={postData}>
              <div className="w-full mr-2 lg:w-1/2">
                <div className="mt-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium "
                  >
                    Task Name
                  </Typography>

                  <Input
                    placeholder="Antares CCTV"
                    type="text"
                    name="name"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    NVR Server
                  </Typography>
                  <Input
                    type="text"
                    name="server"
                    placeholder="36.92.168.180"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-2"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium "
                  >
                    NVR Username
                  </Typography>

                  <Input
                    placeholder="admin"
                    type="text"
                    name="username"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium "
                  >
                    NVR Password
                  </Typography>

                  <Input
                    placeholder="******"
                    type="password"
                    name="password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    NVR Port
                  </Typography>
                  <Input
                    placeholder="3000"
                    type="text"
                    name="port"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange} 
                  />
                </div>

                <div className="mb-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    NVR Prefix
                  </Typography>
                  <Input
                    type="text"
                    name="prefix"
                    placeholder="cgi-bin/snapshot.cgi?channel=5&subtype=1"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />
                </div>

                <Button type="button" onClick={handleFetchImage}>Test Image</Button>
                {loading ? (
                  <p>Loading image...</p>
                ) : (
                  imageSrc && <img src={imageSrc} alt="Fetched from server" className="mt-3"/>
                )}

                <img src="" alt="" className="" />
              </div>

              <div className="w-full lg:w-1/2">
                <div className="my-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    FTP URL
                  </Typography> 
                  <Input
                    placeholder="www.gombel.xyz"
                    name="ftp_url"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />
              
                  <Typography
                    placeholder="antares.id"
                    type="text"
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    FTP Port
                  </Typography>
                  <Input
                    placeholder="3000"
                    type="text"
                    name="ftp_port"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={handleChange}
                  />

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    FTP Username
                  </Typography>
                  <Input
                    placeholder="admin"
                    type="text"
                    name="ftp_user"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}    
                    onChange={handleChange}
                  />

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 font-medium"
                  >
                    FTP Password
                  </Typography>
                  <Input
                    placeholder="*****"
                    type="password"
                    name="ftp_pass"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-2" }}
                    onChange={handleChange}
                  />

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium"
                  >
                    FTP Directory
                  </Typography>
                  <Input
                    placeholder="/root"
                    name="ftp_dir"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-2" }}
                    onChange={handleChange}
                  />
                </div>
                <Button onClick={handleSendImage}>Test</Button>
                <Alert open={greenAlertTes} className="" color="green" onClose={() => setGreenAlertTes(false)}>
                  {responseMessage}.  
                </Alert>

                <Alert open={redAlertTes} className="" color="red" onClose={() => setRedAlertTes(false)}>
                  {responseMessage}.
                </Alert>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium flex"
                  >
                    Set Interval <p className="ml-2 font-light">(in miliseconds)</p>
                  </Typography>
                  
                  <Input
                    placeholder="720"
                    type="text"
                    name="send_interval"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                    onChange={handleChange}
                  />
              </div>
            </form> 
            <Button className="w-full mt-4" onClick={postData}>Save</Button>
            <Alert open={greenAlertPost} className="" color="green" onClose={() => setGreenAlertPost(false)}>
                  Task succesfully added.
            </Alert>
            <Alert open={redAlertPost} className="" color="red" onClose={() => setRedAlertPost(false)}>
                  Task not succesfully added.
            </Alert>           
        </Tabs>
      </CardBody>
    </Card>
  );
}