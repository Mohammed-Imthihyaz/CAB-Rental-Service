import { TextField, Typography } from "@mui/material";
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

const passengers = [
  { label: "Name", name: "firstName", defaultValue: "", required: true },
  { label: "Email", name: "email", defaultValue: "", required: false },
];

export default function BookingForm() {
  const [data, seetData] = useState(["Ten", "Twenty", "Thirty"]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    passengers.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("");
  const handleState = (event) => {
    setState(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: "#ff3350" }}>
        NEW BOOKING
      </Typography>
      <Divider sx={{ bgcolor: "black.light" }} />
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} sx={{ border: 0 }}>
            <FormControl fullWidth>
              <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                required
              >
                Customer
              </InputLabel>
              <NativeSelect>
                {data.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item sx={2}>
            <Button variant="contained">refresh</Button>
          </Grid>
          <Grid item xs={2} sx={{ border: 0 }}>
            <NewCustomer />
          </Grid>
          <Grid item xs={12}> </Grid>
          <Box sx={{ flexGrow: 1 , padding: 5,bgcolor: "#e9e9e9",borderRadius: 2}}>
            
            <Grid container spacing={2}>
              {passengers.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
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
              <Grid item xs={12}></Grid>
              </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
