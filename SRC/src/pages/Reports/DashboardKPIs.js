import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";

const DashboardKPIs = () => {
  const [lastRefresh, setLastRefresh] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const formatDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const formattedHours = String(displayHours).padStart(2, "0");
      
      return `${year}-${month}-${day}  ${formattedHours}:${minutes} ${ampm}`;
    };

    setLastRefresh(formatDateTime());
  }, []);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          mb: 3,
          ml: -17,
          mr: -1,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "white",
            mb: 2,
          }}
        >
          DASHBOARD
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{
              maxWidth: 400,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "white",
            }}
          >
            Last Data Refresh: {lastRefresh}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          ml: -17,
          mr: -1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            p: 2,
            borderRadius: 1,
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Header Metrcis
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            p: 2,
            borderRadius: 1,
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            QUICK ACTIONS
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            p: 2,
            borderRadius: 1,
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            CRITICAL ALERT PANEL
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          ml: -17,
          mr: -1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "grey.300",
            p: 3,
            borderRadius: 1,
            minHeight: 400,
            flex: 1,
          }}
        >
          {/* Dashboard content box 1 */}
        </Box>
        <Box
          sx={{
            backgroundColor: "grey.300",
            p: 3,
            borderRadius: 1,
            minHeight: 400,
            flex: 1,
          }}
        >
          {/* Dashboard content box 2 */}
        </Box>
        <Box
          sx={{
            backgroundColor: "grey.300",
            p: 3,
            borderRadius: 1,
            minHeight: 400,
            flex: 1,
          }}
        >
          {/* Dashboard content box 3 */}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "grey.300",
          p: 3,
          borderRadius: 1,
          minHeight: 400,
          ml: -17,
          mr: -1,
          mt: 2,
        }}
      >
        {/* Dashboard content - big box */}
      </Box>
      <Box
        sx={{
          backgroundColor: "grey.300",
          p: 3,
          borderRadius: 1,
          minHeight: 400,
          ml: -17,
          mr: -1,
          mt: 2,
        }}
      >
        {/* Dashboard content - big box 2 */}
      </Box>
    </Box>
  );
};

export default DashboardKPIs;
