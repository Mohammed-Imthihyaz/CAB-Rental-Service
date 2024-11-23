import { Box, Grid, Typography, Divider, Paper, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import React, { useState } from 'react';

const data = [
  {
    Id: 1,
    startDate: "2024-11-23",
    endDate: "2024-11-2",
    garageStartDate: "2024-11-22",
    reportingTime: "12:40",
    fromCity: "New York",
    toCity: "Chicago",
    dutyType: "Full-Day",
    vehicleGroup: "SUV",
    reportingAddress: "123 Main Street, New York, NY",
    dropAddress: "456 Elm Street, Brooklyn, NY",
    status: "Alloting",
  },
];

const vehicleNames = ["Toyota Innova", "Toyota Etios", "Swift Dzire"];

const AllotBooking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ color: "#000000", paddingLeft: "10px" }}
          >
            Allot Booking
          </Typography>
          <Divider sx={{ bgcolor: "black.light", padding: "1px" }} />
        </Grid>

        
        <Grid item xs={12} md={12}>
          <Paper sx={{ padding: 1 }}>
            {data.map((row) => (
              <Grid container spacing={2} key={row.Id}>
                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.Id}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Start Date
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.startDate}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    End Date
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.endDate}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Garage Start Date
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.garageStartDate}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Reporting Time
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.reportingTime}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    From City
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.fromCity}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    To City
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.toCity}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Duty Type
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.dutyType}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Vehicle Group
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.vehicleGroup}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Reporting Address
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.reportingAddress}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Drop Address
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.dropAddress}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{row.status}</Typography>
                </Grid>
              </Grid>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} paddingTop={2}>
          <Paper sx={{ padding: 2 }}>
            <Grid items xs={12} md={12} sx={{padding :1}}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              My Vehicles
            </Typography>
            </Grid>
            <FormControl fullWidth>
              <InputLabel id="vehicle-select-label" >Select Vehicle</InputLabel>
              <Select
                labelId="vehicle-select-label"
                id="vehicle-select"
                label="Select Vehicle"
                value={selectedVehicle}
                onChange={handleChange}
              >
                {vehicleNames.map((vehicle, index) => (
                  <MenuItem key={index} value={vehicle}>
                    {vehicle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedVehicle && (
              <Typography sx={{ marginTop: 2 }}>
                Selected Vehicle: {selectedVehicle}
              </Typography>
            )}
          </Paper>
          <Grid
            marginLeft={80}
            marginTop={2}
            >
            <Button variant="contained" color="primary">
            Allot
            </Button>
         </Grid>

        </Grid>
        

    </Box>
  );
};

export default AllotBooking;
