import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const [open, setOpen] = React.useState(false);
  const navigate =useNavigate();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setOpen(true); // Show Snackbar
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Hide Snackbar
  };

  const createData = (Name, Phone, Email) => {
    return { Name, Phone, Email };
  };

  const rows = [
    createData("Imthihyaz", 9014033362, "mohammed@gmail.com"),
    createData("Imthihyaz", 9014033362, "mohammed@gmail.com"),
  ];

  const message = `Booking confirmed for 05/11 for 
Passenger: imthi(09014033362)
Vehicle group: Toyota Innova
Reporting time: 00:15
Reporting address: HBR layout, F1003, Block F, Nellukunte North Taluka
Flight/Train Number: NA
Vehicle and driver details will be sent to you before the pickup time.
Regards, Mohammed Imthihyaz
Contact: 7075193812 
- Sent via PKS`;

const handleSubmit=()=>{
console.log("Message Sent");
navigate('/Allot')
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#000000", paddingLeft: "2px" }}
          >
            Booking created successfully. Send booking confirmation,
          </Typography>
          <Divider sx={{ bgcolor: "black.light", padding: "1px" }} />
        </Grid>
        <Grid item xs={12} md={12}>
          <br />
          <Grid container spacing={2}>
            <Box sx={{ flexGrow: 2, boxShadow: 3 }}>
              <Grid item xs={12} md={12} sx={{ borderRadius: 3 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>
                      The Email and SMS will be sent to the above Customers
                    </caption>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Name</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Send SMS</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Send Email</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.Name}
                          </TableCell>
                          <TableCell align="right">{row.Phone}</TableCell>
                          <TableCell align="right">{row.Email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} md={12}>
            <Divider sx={{ bgcolor: "black.light", paddingTop: 4 }} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "#000000", paddingTop: 2 }}
            >
              Message
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                padding: 4,
                bgcolor: "#f1f1f1",
                borderRadius: 2,
              }}
            >
              <Grid
                item
                xs={12}
                md={12}
                sx={{ bgcolor: "white", borderRadius: 2 }}
              >
                <Grid item md={12} xs={12} sx={{ padding: 2 }}>
                  {message.split("\n").map((line, index) => (
                    <Typography variant="overline" gutterBottom key={index}>
                      {line}
                      <br />
                    </Typography>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
          <Box textAlign='center'>

            <Button
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={handleCopy}
              >
              Copy Message
            </Button>
            </Box>
            </Grid>
            </Box>
          </Grid>
          <br/>
          <Divider sx={{ bgcolor: "black.light" }} />
            <Snackbar
              open={open}
              autoHideDuration={2000} // Auto-hide after 3 seconds
              onClose={handleClose}
              message="Message copied to clipboard!"
              />
            <br />
          </Grid>
          <Grid item xs={12} md={12}>
          <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
              >
              Send
            </Button>
          </Grid>
      </Grid>
    </Box>
  );
};

export default BookingConfirmation;
