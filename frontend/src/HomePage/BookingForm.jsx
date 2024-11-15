import { Grid2, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import * as React from "react";
import { useState } from "react";
import NewCustomer from "./NewCustomer";
import CabDetails from "./Cab-Details";

export default function BookingForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: "#ff3350" }}>
        NEW BOOKING
      </Typography>
      <Divider sx={{ bgcolor: "black.light" }} />
      <Box sx={{ flexGrow: 2, paddingTop: 3, paddingLeft:4}}>
        <Grid container spacing={4}>
          <Grid item xs={8} >
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
          <Grid item xs={12}>
            <CabDetails />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
