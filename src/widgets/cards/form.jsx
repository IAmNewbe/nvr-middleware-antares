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
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
 
export default function NVRForm() {
  const [type, setType] = React.useState("card");
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImage = () => {
    setLoading(true); // Set loading state when the button is clicked
    fetch('http://localhost:3000/fetch-image')
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
 
  return (
    <Card className="w-full mt-5 md:mt-10">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center bg-orange-600 shadow-md"
      >
        <div className="mb-4 h-20 p-6 text-white">
          {type === "card" ? (
            <CreditCardIcon className="h-10 w-10 text-white" />
          ) : (
            <CreditCardIcon className="h-10 w-10 text-white" />
            // <img alt="paypal " className="w-14 " src="https://docs.material-tailwind.com/icons/paypall.png" />
          )}
        </div>
        <Typography variant="h5" color="white">
          Add New Task
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab value="card" onClick={() => setType("card")}>
              RSTP API Credentials
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
              <form className="mt-12 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    RSTP Username
                  </Typography>
                  <Input
                    type="text"
                    placeholder="admin"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="my-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium "
                  >
                    RSTP Password
                  </Typography>
 
                  <Input
                    placeholder="******"
                    type="password"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
 
                <div className="mb-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    RSTP Port
                  </Typography>
                  <Input
                    placeholder="10180"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    RSTP Prefix
                  </Typography>
                  <Input
                    type="text"
                    placeholder="channel=4&subtype=1"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                
                
                  <Button size="lg" onClick={fetchImage}>Test</Button>
                  {loading ? (
                    <p>Loading image...</p>
                  ) : (
                    imageSrc && <img src={imageSrc} alt="Fetched from server" />
                  )}

                <img src="" alt="" className="" />

                <Tab value="paypal" onClick={() => setType("paypal")} 
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                  Continue
                </Tab>
              </form>
            </TabPanel>
            <TabPanel value="paypal" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Personal Details
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Your Email
                  </Typography>
                  <Input
                    type="email"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
 
                <div className="my-6">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Billing Address
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Country
                  </Typography>
                  <Select
                    placeholder="USA"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900">
                    <option value="halo">

                    </option>
                  </Select>
                  {/* <Select
                    placeholder="USA"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    menuProps={{ className: "h-48" }}
                  >
                    {countries.map(({ name, flags }) => (
                      <Option key={name} value={name}>
                        <div className="flex items-center gap-x-2">
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          {name}
                        </div>
                      </Option>
                    ))}
                  </Select> */}
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 -mb-2 font-medium"
                  >
                    Postal Code
                  </Typography>
                  <Input
                    placeholder="0000"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{ className: "mt-4" }}
                  />
                </div>
                <Button size="lg">Test</Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}