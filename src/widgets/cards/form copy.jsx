import React, { useState } from "react";
// import { useCountries } from "use-react-countries";
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
 
export default function NVRForm() {
  const [type, setType] = React.useState("card");
  const [inputDataNVR, setInputDataNVR] = useState(
    {
      name: '',
      server: '',
      port: '',
      username: '',  
      password: '',
      prefix: '',
      
    }
  );
  const [inputDataFTP, setInputDataFTP] = useState({
      ftp_url: '',
      ftp_port: '',
      ftp_user: '',
      ftp_pass: '',
      ftp_dir: '',
      send_interval: 5000,
      status: '',
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [open, setOpen] = React.useState(false);
  const backEndUrl = 'localhost';
  const backEndPort = 3000;
  const backEndPath = '/postTaskById';

  const handleFetchImage = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true);

    // Construct the full URL based on user input
    const fullUrl = `http://${server}:${port}/${prefix}`;
    console.log(fullUrl);

    fetch(fullUrl)
      .then(response => response.blob()) // Convert the response to a blob (binary data)
      .then(blob => {
        // Create a local URL for the image blob
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl); // Set the image URL as the source
        setLoading(false); // Stop loading when image is fetched
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        setLoading(false); // Stop loading in case of error
      });
  };

  const postData = (e) => {
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
        setOpen(true);
        console.log(open);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error sending data:', error);
        setResponseMessage('Error sending data');
        setSuccess(false);
        setLoading(false);
      });
  };
 
  return (
    <Card className="w-full mt-5 md:mt-10">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center bg-orange-600 shadow-md"
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
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4" onSubmit={postData}>
                <div className="mt-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium "
                  >
                    Task Name
                  </Typography>
 
                  <Input
                    placeholder="Antares CCTV"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    NVR Server
                  </Typography>
                  <Input
                    type="text"
                    placeholder="36.92.168.180"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setServer(e.target.value)}
                  />
                </div>

                <div className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium "
                  >
                    NVR Username
                  </Typography>
 
                  <Input
                    placeholder="admin"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium "
                  >
                    NVR Password
                  </Typography>
 
                  <Input
                    placeholder="******"
                    type="password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
 
                <div className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    NVR Port
                  </Typography>
                  <Input
                    placeholder="3000"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setPort(e.target.value)} 
                  />
                </div>

                <div className="mb-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    NVR Prefix
                  </Typography>
                  <Input
                    type="text"
                    placeholder="cgi-bin/snapshot.cgi?channel=5&subtype=1"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setPrefix(e.target.value)}
                  />
                </div>

                <Alert open={open} className="absolute z-50 top-1/4" color="green" onClose={() => setOpen(false)}>
                  Task succesfully added.
                </Alert>

                <Button size="lg" type="button" onClick={handleFetchImage}>Test</Button>
                {loading ? (
                  <p>Loading image...</p>
                ) : (
                  imageSrc && <img src={imageSrc} alt="Fetched from server" />
                )}

                <Button type="submit">Save</Button>

                <img src="" alt="" className="" />

                <Tab value="paypal" onClick={() => setType("paypal")} 
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                  Continue
                </Tab>
              </form>
            </TabPanel>
            <TabPanel value="paypal" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div className="my-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    FTP URL
                  </Typography> 
                  <Input
                    placeholder="www.gombel.xyz"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />
              
                  <Typography
                    placeholder="antares.id"
                    type="text"
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium"
                  >
                    FTP Port
                  </Typography>
                  <Input
                    placeholder="3000"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium"
                  >
                    FTP Username
                  </Typography>
                  <Input
                    placeholder="admin"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />

                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium"
                  >
                    FTP Password
                  </Typography>
                  <Input
                    placeholder="*****"
                    type="password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
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
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />
                </div>
                <Button size="lg">Test</Button>

                <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium flex"
                  >
                    Set Interval <p className="ml-2 font-light">(in seconds)</p>
                  </Typography>
                  
                  <Input
                    placeholder="720"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}