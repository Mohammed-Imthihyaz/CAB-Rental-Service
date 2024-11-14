import { MenuItem, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import React, { useState } from "react";

const customerDetails = [
  { label: "Name", name: "firstName", defaultValue: "", required: true },
  { label: "Email", name: "email", defaultValue: "", required: false },
  { label: "Phone", name: "phone", defaultValue: "", required: false },
  { label: "Address", name: "address", defaultValue: "", required: false },
  { label: "City", name: "city", defaultValue: "", required: false },
  { label: "Country", name: "country", defaultValue: "", required: false },
  { label: "Zip Code", name: "zipCode", defaultValue: "", required: false },
  {
    label: "State",
    name: "state",
    defaultValue: "",
    required: false,
    type: "dropdown",
  },
  { label: "GSTIN Number", name: "gstin", defaultValue: "", required: false },
];

const billing = [
  { label: "Billing Name", name: "billingName", defaultValue: "" },
  { label: "Billing Address", name: "billingAddress", defaultValue: "" },
];

const NewCustomer = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    customerDetails.reduce((acc, field) => {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    if (validate()) {
      // Proceed with saving logic if validation passes
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = () => {
    let newErrors = {};
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers.";
    }
    customerDetails.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        ADD NEW CUSTOMER
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container .MuiPaper-root": {
            width: "100%",
            maxWidth: "90%",
            height: "100%",
            maxHeight: "90%",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"ADD NEW CUSTOMER"}</DialogTitle>
        <Divider sx={{ bgcolor: "black.light" }} />
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {customerDetails.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  {field.type === "dropdown" ? (
                    <Select
                      label={field.label}
                      name={field.name}
                      value={state}
                      onChange={handleState}
                      fullWidth
                      displayEmpty
                    >
                      <MenuItem value="" disable>Select State</MenuItem>
                      <MenuItem value="AP">Andhra Pradesh</MenuItem>
                      <MenuItem value="KA">karnataka</MenuItem>
                      <MenuItem value="TS">Telangana</MenuItem>
                    </Select>
                  ) : (
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
                  )}
                </Grid>
              ))}
              <Grid item xs={12}></Grid>

              <Grid
                item
                xs={12}
                sx={{ bgcolor: "#e9e9e9", borderRadius: 2, padding: 4 }}
              >
                
                <Typography variant="body1" gutterBottom>
                  <b>GSTIN Billing details -</b> only to be filled if the
                  customer has different billing details
                </Typography>
                <Grid container spacing={3}>
                  {billing.map((field) => (
                    <Grid item xs={12} sm={12} key={field.name}>
                      <TextField
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewCustomer;
