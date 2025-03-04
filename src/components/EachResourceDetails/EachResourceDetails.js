import React from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const EachResourceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Hook to navigate programmatically
  const resource = location.state?.resource;

  if (!resource) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" fontWeight={"bold"}>Resource Not Found</Typography>
      </Container>
    );
  }

  // Sample utilization data (should be replaced with real API data)
  const utilizationCpuData = [
    { time: "10:00", cpu: 30 },
    { time: "10:05", cpu: 50 },
    { time: "10:10", cpu: 45 },
    { time: "10:15", cpu: 40 },
    { time: "10:20", cpu: 95 },
  ];

  const utilizationMemoryData = [
    { time: "10:00", memory: 40 },
    { time: "10:05", memory: 20 },
    { time: "10:10", memory: 45 },
    { time: "10:15", memory: 10 },
    { time: "10:20", memory: 25 },

  ]

  return (
    <Container sx={{ mt: 3 }}>
      {/* Back Button */}
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2, border:"2px solid #006a4d", color:"#006a4d" }}>
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          Resource Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Dynamic Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                {Object.keys(resource).map((key, index) => (
                  <TableCell key={index} variant="head" sx={{ fontWeight: 700, backgroundColor:"#006a4d", color:"white" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize key names */}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ backgroundColor: "#dee0df" }}>
                {Object.values(resource).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Utilization CPU Chart */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: "#dee0df" }}>
        <Typography variant="h6" gutterBottom>
          CPU Utilization
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={utilizationCpuData}>
            <XAxis dataKey="time" stroke="#1976d2" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cpu" stroke="#1976d2" fill="#1976d2" name="CPU Usage (%)" />
           { /* <Line type="monotone" dataKey="memory" stroke="#02781a" name="Memory Usage (%)" /> */}
          </AreaChart>
        </ResponsiveContainer>
     
          {/* Utilization Memory Chart */}
        <Typography variant="h6" gutterBottom mt={3}>
          Memory Utilization
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={utilizationMemoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#43a047"/>
            <YAxis />
            <Tooltip />
            <Legend />
           { /* <Line type="monotone" dataKey="cpu" stroke="#5718f5" name="CPU Usage (%)" /> */}
            <Bar type="monotone" dataKey="memory" fill="#43a047" name="Memory Usage (%)"  barSize={40} radius={[5, 5, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default EachResourceDetails;
