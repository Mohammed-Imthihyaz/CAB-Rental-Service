import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useState } from "react";

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
const CabDetails = () => {
  const [selectedCities, setSelectedCities] = useState({});
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [repTime, setrepTime] = React.useState(dayjs());
  const [Bill, setBill] = React.useState("");

  const handleChange = (event) => {
    setBill(event.target.value);
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

  const handleCityChange = (event, name) => {
    const value = event.target.value;
    setSelectedCities((prevSelectedCities) => ({
      ...prevSelectedCities,
      [name]: value,
    }));
  };

  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          {cityOptions.map((city, index) => (
            <Grid item xs={3} key={index}>
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
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label={
                    <span>
                      Start Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  required
                />
                <DatePicker
                  label={
                    <span>
                      End Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <TimePicker
                  label="REP. Time"
                  value={repTime}
                  onChange={(newValue) => setrepTime(newValue)}
                />
                <TimePicker
                  label="EST. Drop Time"
                  value={repTime}
                  onChange={(newValue) => setrepTime(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={2} style={{ border: 2, padding: 23 }}>
            <TextField
              label="Start from garage before (in min)"
              variant="outlined"
              sx={{ width: "27ch", right: "4rem" }}
              type="number"
              required
            />
          </Grid>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "43ch" } }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item xs={3} sm={12}>
                {address.map((items, index) => (
                  <TextField
                    key={index}
                    label={items.label}
                    name={items.name}
                    defaultValue={items.defaultValue}
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={3}>
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
        </Grid>
      </Box>
    </>
  );
};

export default CabDetails;
