import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sync the active tab with the current route
  const getTabIndex = (path) => {
    switch (path) {
      case "/duties":
        return 0;
      case "/operations":
        return 1;
      case "/payment-gateway":
        return 2;
      default:
        return 0;
    }
  };

  const [value, setValue] = React.useState(getTabIndex(location.pathname));

  useEffect(() => {
    setValue(getTabIndex(location.pathname));
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const routes = ["/duties", "/operations", "/payment-gateway"];
    navigate(routes[newValue]);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          xs={2}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <img
            src="../../images/logo.jpg"
            alt="Logo"
            style={{ height: 50 }}
          />
        </Grid>
        <Grid item xs={10}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ bgcolor: "rgba(236, 236, 236,0.7)" }}
          >
            <Tab label="Duties" />
            <Tab label="Operations" />
            <Tab label="Payment Gateway" />
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  );
}
