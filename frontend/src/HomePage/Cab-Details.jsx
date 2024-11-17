import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useState } from "react";
import NewCustomer from "./NewCustomer";

const cityOptions = [
  {
    label: "From (Service Location)",
    name: "from",
    options: ["bangalore", "hyderabad", "delhi", "ananthapur"],
  },
  {
    label: "To",
    name: "to",
    options: ["mumbai", "pune", "kolkata", "chennai"],
  },
  {
    label: "Vechical Group",
    name: "vechical",
    options: ["etios", "Tayota inova"],
  },
  {
    label: "Duty Type",
    name: "city2",
    options: ["250KM per day", "300KM per day", "4H 40KMs", "8H 80KMs"],
  },
];
const address = [
  { label: "Reporting Address ", name: "rep add", defaultValue: "" },
  { label: "Drop Address", name: "rep add", defaultValue: "" },
  { label: "Flight/Train Number", name: "flight/train", defaultValue: "" },
];

const price = [
  {
    label: "Price",
    name: "price",
    defaultValue: "",
    type: "number",
    required: true,
  },
  {
    label: "Per Extra KM Rate",
    name: "price/KM",
    defaultValue: "",
    type: "number",
    required: true,
  },
  {
    label: "Per Extra HR Rate",
    name: "price/HR",
    defaultValue: "",
    type: "number",
    required: true,
  },
];

const initialPassengers = [
  {
    label: "Book by name",
    name: "firstName",
    defaultValue: "",
    required: false,
  },
  {
    label: "Book by email",
    name: "email",
    defaultValue: "",
    required: false,
  },
  {
    label: "Book by phone",
    name: "phone",
    defaultValue: "",
    required: false,
  },
  {
    label: "Passenger Name",
    name: `passengerName`,
    defaultValue: "",
    required: false,
  },
  {
    label: "Passenger Phone Number",
    name: `passengerPhone`,
    defaultValue: "",
    required: false,
  },
  {
    label: "Passenger email",
    name: `passengerEmail`,
    defaultValue: "",
    required: false,
  },
];

const CabDetails = () => {
  const [selectedCities, setSelectedCities] = useState({});
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [repTime, setrepTime] = React.useState(dayjs());
  const [estTime, setestTime] = React.useState(dayjs());
  const [Bill, setBill] = React.useState("");
  const [priceFormData, setPriceFormData] = useState({
    price: "",
    pricePerKM: "",
    pricePerHR: "",
  });

  const [data, setData] = useState(["Ten", "Twenty", "Thirty"]);
  const [open, setOpen] = useState(false);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [formData, setFormData] = useState(
    initialPassengers.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setBill(event.target.value);
  };

  const addPassenger = () => {
    const newPassengerFields = [
      {
        label: "Passenger Name",
        name: `passengerName${passengers.length}`,
        defaultValue: "",
        required: false,
      },
      {
        label: "Passenger Phone Number",
        name: `passengerPhone${passengers.length}`,
        defaultValue: "",
        required: false,
      },
      {
        label: "Passenger email",
        name: `passengerEmail${passengers.length}`,
        defaultValue: "",
        required: false,
      },
    ];

    setPassengers((prev) => [...prev, ...newPassengerFields]);
  };
  const removePassenger = () => {
    if (passengers.length > initialPassengers.length) {
      setPassengers((prev) => prev.slice(0, -3)); // Removes the last passenger fields added.
    }
  };
  const handleSubmit = () => {
    const formData = {
      selectedCities,
      startDate,
      endDate,
      repTime,
      Bill,
      // Collect any additional fields if necessary
    };
    console.log(formData); // Replace this with your API call
  };
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (event, name) => {
    const value = event.target.value;
    setSelectedCities((prevSelectedCities) => ({
      ...prevSelectedCities,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: "#ff3350" }}>
        NEW BOOKING
      </Typography>
      <Divider sx={{ bgcolor: "black.light" }} />
      <Box sx={{ flexGrow: 2, paddingTop: 3, paddingLeft: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                required
              >
                Customer
              </InputLabel>
              <NativeSelect>
                {data.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item sx={2}>
            <Button variant="contained">refresh</Button>
          </Grid>

          <Grid item xs={2} sx={{ border: 0 }}>
            <NewCustomer />
          </Grid>
          <Grid item xs={12}></Grid>

          <Box
            sx={{
              flexGrow: 2,
              bgcolor: "#f2f2f2",
              padding: 3,
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <Grid item xs={12} sx={{ padding: 2 }}>
              <Typography variant="body1">
                <b>Booked by/Passenger</b>
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {passengers.map((field, index) => (
                <Grid item xs={12} sm={4} key={`${field.name}-${index}`}>
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] || ""}
                  />
                </Grid>
              ))}
              <Grid item xs={10}>
                <Button variant="outlined" onClick={addPassenger}>
                  + ADD ANOTHER PASSENGER
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={removePassenger}
                >
                  {" "}
                  X REMOVE PASSENGER
                </Button>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 2, padding: 2 }}>
            <Grid container spacing={4}>
              {cityOptions.map((city, index) => (
                <Grid item xs={3} sm={3} md={3} key={index}>
                  <FormControl fullWidth key={index} sx={{ marginBottom: 2 }}>
                    <InputLabel variant="standard" required>
                      {city.label}
                    </InputLabel>
                    <NativeSelect
                      value={selectedCities[city.name]}
                      onChange={(event) => handleCityChange(event, city.name)}
                    >
                      {city.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              ))}
              <Grid container spacing={2} alignItems="center">
                {/* Date and Time Pickers */}
                <Grid item xs={12} sm={8} md={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "TimePicker"]}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        required
                      />
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={setEndDate}
                        required
                      />
                      <TimePicker
                        label="REP. Time"
                        value={repTime}
                        onChange={setrepTime}
                      />
                      <TimePicker
                        label="EST. Drop Time"
                        value={estTime}
                        onChange={setestTime}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    label="Start from garage before (in min)"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              {address.map((addr, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <TextField
                    fullWidth
                    label={addr.label}
                    name={addr.name}
                    defaultValue={addr.defaultValue}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Bill To</InputLabel>
                  <Select value={Bill} label="Bill To" onChange={handleChange}>
                    <MenuItem value={"Company/Customer"}>
                      Company/Customer(Default)
                    </MenuItem>
                    <MenuItem value={"Company Credit"}>
                      Company (Credit Card)
                    </MenuItem>
                    <MenuItem value={"Company Direct"}>
                      Company (Direct Payment)
                    </MenuItem>
                    <MenuItem value={"Personal"}>Personal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {price.map((item, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                  <TextField
                    fullWidth
                    label={item.label}
                    name={item.name}
                    type={item.type}
                    value={priceFormData[item.name]}
                    onChange={handlePriceChange}
                    required={item.required}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="primary" fullWidth>
                  Get Price
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default CabDetails;
