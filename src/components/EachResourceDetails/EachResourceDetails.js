import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Typography, Paper, Divider, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Grid
} from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

const EachResourceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resource = location.state?.resource;
  
  // Machine Configuration (Mocked GCP-style)
  const [configuration, setConfiguration] = useState({
    machineType: "e2-standard-4",
    vCPUs: 4,
    memoryGB: 16, // in GB
    diskType: "Balanced Persistent Disk (pd-balanced)"
  });

  // State for utilization data
  const [utilizationCpuData, setUtilizationCpuData] = useState([]);
  const [utilizationMemoryData, setUtilizationMemoryData] = useState([]);
  const [cpuMin, setCpuMin] = useState(0);
  const [cpuMax, setCpuMax] = useState(0);
  const [memoryMin, setMemoryMin] = useState(0);
  const [memoryMax, setMemoryMax] = useState(0);

  // Generate realistic CPU and Memory usage based on machine config
  const fetchUtilizationData = async () => {
    try {
      const maxCpuLoad = configuration.vCPUs * 100;  // Max CPU = vCPUs * 100%
      const maxMemoryLoad = configuration.memoryGB * 1024; // Max Memory in MB

      const cpuData = Array.from({ length: 5 }, (_, i) => ({
        time: `10:${i * 5}`,
        cpu: Math.floor(Math.random() * maxCpuLoad) // Simulated CPU % per vCPU
      }));

      const memoryData = Array.from({ length: 5 }, (_, i) => ({
        time: `10:${i * 5}`,
        memory: Math.floor(Math.random() * maxMemoryLoad) // Simulated Memory in MB
      }));

      setUtilizationCpuData(cpuData);
      setUtilizationMemoryData(memoryData);

      // Min/Max calculations based on real machine capacity
      setCpuMin(Math.min(...cpuData.map(d => d.cpu)));
      setCpuMax(Math.max(...cpuData.map(d => d.cpu)));
      setMemoryMin(Math.min(...memoryData.map(d => d.memory)));
      setMemoryMax(Math.max(...memoryData.map(d => d.memory)));

    } catch (error) {
      console.error("Error fetching utilization data:", error);
    }
  };

  useEffect(() => {
    fetchUtilizationData();
  }, [configuration]);

  if (!resource) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" fontWeight={"bold"}>Resource Not Found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      {/* Back Button */}
      <Button variant="outlined" onClick={() => navigate(-1)}
        sx={{ mb: 2, border: "2px solid #006a4d", color: "#006a4d" }}>
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          Resource Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Previous Resource Details Table */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow >
                {Object.keys(resource).map((key, index) => (
                  <TableCell key={index} variant="head" sx={{ fontWeight: 700, backgroundColor:"#006a4d", color:"white" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
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

        {/* Machine Configuration Table */}
        <Typography variant="h6" gutterBottom>
          Machine Configuration
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(configuration).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                  <TableCell>{value}{key === "memoryGB" ? " GB" : ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Utilization CPU Chart */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: "#dee0df" }}>
        <Typography variant="h6" gutterBottom>
          CPU Utilization
        </Typography>

        {/* Min/Max CPU Values */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Min CPU: {cpuMin} %</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Max CPU: {cpuMax} %</Typography>
          </Grid>
        </Grid>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={utilizationCpuData}>
            <XAxis dataKey="time" stroke="#1976d2" />
            <YAxis domain={[0, configuration.vCPUs * 100]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="cpu" stroke="#1976d2" fill="#1976d2" name="CPU Usage (%)" />
          </AreaChart>
        </ResponsiveContainer>

        {/* Utilization Memory Chart */}
        <Typography variant="h6" gutterBottom mt={3}>
          Memory Utilization
        </Typography>

        {/* Min/Max Memory Values */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Min Memory: {memoryMin} MB</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Max Memory: {memoryMax} MB</Typography>
          </Grid>
        </Grid>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={utilizationMemoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#43a047"/>
            <YAxis domain={[0, configuration.memoryGB * 1024]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="memory" fill="#43a047" name="Memory Usage (MB)" barSize={40} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default EachResourceDetails;
