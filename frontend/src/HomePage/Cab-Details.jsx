import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  NativeSelect,
  Snackbar,
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
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/bookingStore.js";
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
    name: "dutyType",
    options: ["250KM per day", "300KM per day", "4H 40KMs", "8H 80KMs"],
  },
];

const address = [
  { label: "Reporting Address", name: "reportingAddress", defaultValue: "" },
  { label: "Drop Address", name: "dropAddress", defaultValue: "" },
  { label: "Flight/Train Number", name: "flightTrainNumber", defaultValue: "" },
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
    name: "pricePerKM",
    defaultValue: "",
    type: "number",
    required: true,
  },
  {
    label: "Per Extra HR Rate",
    name: "pricePerHR",
    defaultValue: "",
    type: "number",
    required: true,
  },
];
const bookingAgent = [
  {
    label: "Booked By Name",
    name: "AgentName",
    defaultValue: "",
    required: true,
  },
  {
    label: "Booked By Phone Number",
    name: "AgentPhone",
    defaultValue: "",
    required: true,
    validate: (value) => {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(value) ? "" : "Phone number must be 10 digits";
    },
  },
  {
    label: "Booked By email",
    name: "AgentEmail",
    defaultValue: "",
    required: true,
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? "" : "Invalid email format";
    },
  },
];

const initialPassengers = [
  {
    label: "Passenger Name",
    name: "passengerName",
    defaultValue: "",
    required: true,
  },
  {
    label: "Passenger Phone Number",
    name: "passengerPhone",
    defaultValue: "",
    required: true,
    validate: (value) => {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(value) ? "" : "Phone number must be 10 digits";
    },
  },
  {
    label: "Passenger email",
    name: "passengerEmail",
    defaultValue: "",
    required: true,
    validate: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? "" : "Invalid email format";
    },
  },
];

const CabDetails = () => {
  const [selectedCities, setSelectedCities] = useState({});
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [repTime, setRepTime] = useState(dayjs());
  const [estTime, setEstTime] = useState(dayjs());
  const [bill, setBill] = useState("");
  const [priceFormData, setPriceFormData] = useState({
    price: "",
    pricePerKM: "",
    pricePerHR: "",
  });
  const [garageTime, setGarageTime] = useState(0);
  const [addressData, setAddressData] = useState(
    address.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const [data] = useState(["Ten", "Twenty", "Thirty"]);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [formData, setFormData] = useState(
    initialPassengers.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {})
  );
  const [passengersList, setPassengersList] = useState([{
    passengerName: "",
    passengerPhone: "",
    passengerEmail: "",
  }]);
  const[bookedAgent,setBookedAgent]=useState(bookingAgent);
  const[formbookedData,setformbookedData]=useState(
    bookingAgent.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {})
  );
  const [totalPrice, setTotalPrice] = useState(null);
  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState("");
  const navigate = useNavigate();
  const { isLoading, error, message, newBooking, resetState } = useBookingStore();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleSnackbarClose = () => {
    setShowSuccessMessage(false);
    resetState();
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengersList];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengersList(updatedPassengers);
  };
  const handleAgentChange = (event) => {
    const { name, value } = event.target;
    setformbookedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBillChange = (event) => {
    setBill(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGarageTimeChange = (event) => {
    setGarageTime(event.target.value);
  };

   const addPassenger = () => {
    setPassengersList([
      ...passengersList,
      {
        passengerName: "",
        passengerPhone: "",
        passengerEmail: "",
      },
    ]);
  };

  const removePassenger = () => {
    if (passengersList.length > 1) {
      setPassengersList(passengersList.slice(0, -1));
    }
  };

  const validatePassengers = () => {
    const passengerErrors = {};
    passengersList.forEach((passenger, index) => {
      if (!passenger.passengerName) {
        passengerErrors[`passenger${index}Name`] = "Passenger name is required";
      }
      if (!passenger.passengerPhone) {
        passengerErrors[`passenger${index}Phone`] = "Phone number is required";
      } else if (!/^\d{10}$/.test(passenger.passengerPhone)) {
        passengerErrors[`passenger${index}Phone`] = "Phone number must be 10 digits";
      }
      if (!passenger.passengerEmail) {
        passengerErrors[`passenger${index}Email`] = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.passengerEmail)) {
        passengerErrors[`passenger${index}Email`] = "Invalid email format";
      }
    });
    return passengerErrors;
  };


  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    if (validatePriceFields()) {
      const { price, pricePerKM, pricePerHR } = priceFormData;
      const total = parseFloat(price) * parseFloat(pricePerKM) * parseFloat(pricePerHR);
      setTotalPrice(total);
    }
  };

  const handleCityChange = (event, name) => {
    const value = event.target.value;
    setSelectedCities((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when value is selected
    if (value) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validatePriceFields = () => {
    const priceErrors = {};
    price.forEach((field) => {
      const value = priceFormData[field.name];
      if (!value) {
        priceErrors[field.name] = `${field.label} is required`;
      } else if (isNaN(value) || parseFloat(value) <= 0) {
        priceErrors[field.name] = `${field.label} must be a positive number`;
      }
    });
    setErrors((prev) => ({ ...prev, ...priceErrors }));
    return Object.keys(priceErrors).length === 0;
  };

  const validateDates = () => {
    const dateErrors = {};
    if (!startDate) {
      dateErrors.startDate = "Start date is required";
    }
    if (!endDate) {
      dateErrors.endDate = "End date is required";
    }
    if (startDate && endDate && dayjs(startDate).isAfter(endDate)) {
      dateErrors.dateRange = "Start date must be before end date";
    }
    if (!repTime) {
      dateErrors.repTime = "Reporting time is required";
    }
    if (!estTime) {
      dateErrors.estTime = "Estimated drop time is required";
    }
    setErrors((prev) => ({ ...prev, ...dateErrors }));
    return Object.keys(dateErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate customer selection
    if (!customer) {
      newErrors.customer = "Please select a customer";
    }

    // Validate city selections
    cityOptions.forEach((city) => {
      if (!selectedCities[city.name]) {
        newErrors[city.name] = `${city.label} is required`;
      }
    });
    const passengerErrors = validatePassengers();
    Object.assign(newErrors, passengerErrors);

    // Validate passenger fields
    bookedAgent.forEach((field) => {
      const value = formbookedData[field.name];
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.validate && value) {
        const validationError = field.validate(value);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
    });

    // Validate garage time
    if (!garageTime) {
      newErrors.garageTime = "Start from garage time is required";
    } else if (isNaN(garageTime) || parseInt(garageTime) <= 0) {
      newErrors.garageTime = "Please enter a valid positive number";
    }

    // Validate addresses
    if (!addressData.reportingAddress) {
      newErrors.reportingAddress = "Reporting address is required";
    }
    if (!addressData.dropAddress) {
      newErrors.dropAddress = "Drop address is required";
    }

    // Validate bill selection
    if (!bill) {
      newErrors.bill = "Please select billing type";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    // Combine all validations
    return (
      Object.keys(newErrors).length === 0 &&
      validateDates() &&
      validatePriceFields()
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const bookingData = {
          customer,
          selectedCities,
          startDate: startDate.format(),
          endDate: endDate.format(),
          repTime: repTime.format(),
          estTime: estTime.format(),
          garageTime,
          addressData,
          bill,
          priceFormData,
          totalPrice,
          passengers: passengersList,
          bookedAgent: formbookedData,
        };

        await newBooking(bookingData);
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/operations');
        }, 2000);
       }
    } catch(error) {
      console.error("Error in booking submission:", error);
    }
  };
  return (
    <>
     <br />
      <Typography variant="h4" gutterBottom sx={{ color: "#ff3350", paddingLeft: 2 }}>
        NEW BOOKING
      </Typography>
      <Divider sx={{ bgcolor: "black.light", padding:1}} />
      {error && (
        <Alert severity="error" sx={{ mt: 2, mx: 2 }}>
          {error}
        </Alert>
      )}
       <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Booking created successfully!
        </Alert>
      </Snackbar>
      <Box sx={{ flexGrow: 2, paddingTop: 3, padding: 5 ,paddingLeft: "4.5rem" }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <FormControl fullWidth error={!!errors.customer}>
              <InputLabel variant="standard" required>
                Customer
              </InputLabel>
              
              <NativeSelect value={customer} onChange={handleCustomerChange}>
                <option value=""></option>
                {data.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </NativeSelect>
              {errors.customer && (
                <FormHelperText>{errors.customer}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item >
            <Button variant="contained">refresh</Button>
          </Grid>
          <Grid item xs={2}>
            <NewCustomer />
          </Grid>
         <Grid item md={12}></Grid>
          <Box
            sx={{
              flexGrow: 2,
              bgcolor: "#f2f2f2",
              padding: 3,
              borderRadius: 3,
              boxShadow: 4,
              width: "100%",
            }}
          >
            
            <Grid item xs={12} sx={{ padding: 2 }}>
              <Typography variant="body1">
                <b>Booked by/Passenger</b>
              </Typography>
            </Grid>
            <Grid container spacing={2}>
            {bookingAgent.map((field,index)=>(
                <Grid item xs={12} sm={4} key={`${field.name}-${index}`}>
                <FormControl fullWidth error={!!errors[field.name]}>
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={formbookedData[field.name] || ""}
                    onChange={handleAgentChange}
                    required={field.required}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] || ""}
                  />
                  
                </FormControl>
              </Grid>
              ))}
        {passengersList.map((passenger, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!errors[`passenger${index}Name`]}>
                <TextField
                  label="Passenger Name"
                  value={passenger.passengerName}
                  onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
                  required
                  error={!!errors[`passenger${index}Name`]}
                  helperText={errors[`passenger${index}Name`]}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!errors[`passenger${index}Phone`]}>
                <TextField
                  label="Passenger Phone Number"
                  value={passenger.passengerPhone}
                  onChange={(e) => handlePassengerChange(index, 'passengerPhone', e.target.value)}
                  required
                  error={!!errors[`passenger${index}Phone`]}
                  helperText={errors[`passenger${index}Phone`]}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!errors[`passenger${index}Email`]}>
                <TextField
                  label="Passenger Email"
                  value={passenger.passengerEmail}
                  onChange={(e) => handlePassengerChange(index, 'passengerEmail', e.target.value)}
                  required
                  error={!!errors[`passenger${index}Email`]}
                  helperText={errors[`passenger${index}Email`]}
                />
              </FormControl>
            </Grid>
          </React.Fragment>
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
                  X REMOVE PASSENGER
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid item md={12}></Grid>
          <Box sx={{ flexGrow: 2, padding: 2, width: "100%" }}>
            <Grid container spacing={4}>
              {cityOptions.map((city, index) => (
                <Grid item xs={3} key={index}>
                  <FormControl fullWidth error={!!errors[city.name]}>
                    <InputLabel variant="standard" required>
                      {city.label}
                    </InputLabel>
                    <NativeSelect
                      value={selectedCities[city.name] || ""}
                      onChange={(event) => handleCityChange(event, city.name)}
                    >
                      <option value=""></option>
                      {city.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </NativeSelect>
                    {errors[city.name] && (
                      <FormHelperText>{errors[city.name]}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ))}
     <Grid item md={12}></Grid>
              <Grid container spacing={2} alignItems="center" sx={{paddingLeft:3}}>
                <Grid item xs={12} sm={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "TimePicker"]}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        required
                        slotProps={{
                          textField: {
                            error: !!errors.startDate,
                            helperText: errors.startDate,
                          },
                        }}
                      />
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={setEndDate}
                        required
                        slotProps={{
                          textField: {
                            error: !!errors.endDate,
                            helperText: errors.endDate,
                          },
                        }}
                      />
                      <TimePicker
                        label="REP. Time"
                        value={repTime}
                        onChange={setRepTime}
                        required
                        slotProps={{
                          textField: {
                            error: !!errors.repTime,
                            helperText: errors.repTime,
                          },
                        }}
                      />
                      <TimePicker
                        label="EST. Drop Time"
                        value={estTime}
                        onChange={setEstTime}
                        required
                        slotProps={{
                          textField: {
                            error: !!errors.estTime,
                            helperText: errors.estTime,
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {errors.dateRange && (
                    <FormHelperText error>{errors.dateRange}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth error={!!errors.garageTime}>
                    <TextField
                      label="Start from garage before (in min)"
                      variant="outlined"
                      type="number"
                      required
                      value={garageTime}
                      onChange={handleGarageTimeChange}
                      error={!!errors.garageTime}
                      helperText={errors.garageTime}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {address.map((addr, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <FormControl fullWidth error={!!errors[addr.name]}>
                    <TextField
                      label={addr.label}
                      name={addr.name}
                      value={addressData[addr.name] || ""}
                      onChange={handleAddressChange}
                      required={addr.name !== "flightTrainNumber"}
                      error={!!errors[addr.name]}
                      helperText={errors[addr.name]}
                    />
                  </FormControl>
                </Grid>
              ))}

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth error={!!errors.bill}>
                  <InputLabel>Bill To</InputLabel>
                  <Select value={bill} label="Bill To" onChange={handleBillChange}>
                    <MenuItem value="">Select billing type</MenuItem>
                    <MenuItem value="Company/Customer">
                      Company/Customer(Default)
                    </MenuItem>
                    <MenuItem value="Company Credit">
                      Company (Credit Card)
                    </MenuItem>
                    <MenuItem value="Company Direct">
                      Company (Direct Payment)
                    </MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                  </Select>
                  {errors.bill && <FormHelperText>{errors.bill}</FormHelperText>}
                </FormControl>
              </Grid>

              {price.map((item, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                  <FormControl fullWidth error={!!errors[item.name]}>
                    <TextField
                      label={item.label}
                      name={item.name}
                      type={item.type}
                      value={priceFormData[item.name]}
                      onChange={handlePriceChange}
                      required={item.required}
                      error={!!errors[item.name]}
                      helperText={errors[item.name]}
                    />
                  </FormControl>
                </Grid>
              ))}

              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={calculatePrice}
                >
                  Get Price
                </Button>
                {totalPrice && (
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Total Price: ₹{totalPrice.toFixed(2)}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            size="large"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Booking...' : 'Book'}
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