import React from "react";
import { Box, Typography } from "@mui/material";

const DashboardKPIs = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          mb: 3,
          display: "inline-block",
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            color: "white",
          }}
        >
          ENGINEERING STORE INVENTORY MANAGER - DASHBOARD
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "grey.300",
          p: 3,
          borderRadius: 1,
          minHeight: 400,
        }}
      >
        {/* Dashboard content will go here */}
      </Box>
    </Box>
  );
};

export default DashboardKPIs;
