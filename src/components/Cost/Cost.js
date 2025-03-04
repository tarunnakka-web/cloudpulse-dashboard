import React from "react";
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Select, MenuItem } from "@mui/material";
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {Box} from "@mui/material";
// Mock data for monthly costs (Replace with API fetch in production)
const costData = {
  Weekly: [
    { period: "Week 1", cost: 300 },
    { period: "Week 2", cost: 250 },
    { period: "Week 3", cost: 280 },
    { period: "Week 4", cost: 270 },
  ],
  Monthly: [
    { period: "Jan", cost: 1200 },
    { period: "Feb", cost: 950 },
    { period: "Mar", cost: 1100 },
    { period: "Apr", cost: 1300 },
    { period: "May", cost: 900 },
    { period: "Jun", cost: 1250 },
  ],
  HalfYearly: [
    { period: "H1 2023", cost: 7000 },
    { period: "H2 2023", cost: 8200 },
  ],
  Yearly: [
    { period: "2022", cost: 15000 },
    { period: "2023", cost: 18000 },
  ],
};

// Mock data for resource-specific costs
const resourceCostData = {
  Weekly: [
    { name: "VM Instance 1", type: "Compute Engine", cost: "$50" },
    { name: "Cloud SQL DB", type: "Database", cost: "$40" },
    { name: "Storage Bucket A", type: "Storage", cost: "$30" },
  ],
  Monthly: [
    { name: "VM Instance 1", type: "Compute Engine", cost: "$300" },
    { name: "Cloud SQL DB", type: "Database", cost: "$250" },
    { name: "Storage Bucket A", type: "Storage", cost: "$180" },
    { name: "BigQuery Dataset", type: "Analytics", cost: "$400" },
    { name: "Cloud Function X", type: "Serverless", cost: "$150" },
  ],
  HalfYearly: [
    { name: "VM Instance 1", type: "Compute Engine", cost: "$1800" },
    { name: "Cloud SQL DB", type: "Database", cost: "$1600" },
    { name: "Storage Bucket A", type: "Storage", cost: "$1200" },
  ],
  Yearly: [
    { name: "VM Instance 1", type: "Compute Engine", cost: "$3600" },
    { name: "Cloud SQL DB", type: "Database", cost: "$3200" },
    { name: "Storage Bucket A", type: "Storage", cost: "$2400" },
    { name: "BigQuery Dataset", type: "Analytics", cost: "$5000" },
  ],
};

const Cost = () => {
  const [filter, setFilter] = React.useState("Monthly");

  const filteredResourceCostData = resourceCostData[filter]

  return (
    <Container sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography fontWeight={"bold"} variant="h5" sx={{ mb: 2 }}>CloudPulse Cost Monitoring</Typography>
      <FormControl sx={{ mb: 3, minWidth: 250, padding:"0px", 
    mx: 2,  
    "& .MuiOutlinedInput-root": {
      color: "#006a4d", // Input text color
      "& fieldset": { borderColor: "#006a4d" }, // Default border color
      "&:hover fieldset": { borderColor: "#004d36" }, // Darker on hover
      "&.Mui-focused fieldset": { borderColor: "#006a4d" }, // Keep border color on focus
    },
    "& .MuiInputBase-input": {
      color: "#006a4d", // Text color inside input
      "&::placeholder": { color: "#006a4d", opacity: 1 }, // Placeholder color
    }
   }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="HalfYearly">Half-Yearly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
       </Box>
      {/* Monthly Cost Bar Chart */}
      <Paper sx={{ p: 4, mb: 3, border:"1px solid #aaaaaa", backgroundColor:"#dee0df" }}>
        <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>{filter} Cost Overview</Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={costData[filter]} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <XAxis dataKey="period" 
              tick={{ fontSize: 14, fill: "#006a4d" }} 
              label={{ value: filter, position: "insideBottom", dy: 10, fill: "#006a4d" }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar  dataKey="cost" fill="#006a4d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Resource-Specific Cost Table */}
      <Paper sx={{ p: 4, border:"1px solid #aaaaaa" }}>
        <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>Resource-wise Cost Breakdown</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4"}}>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Name</b></TableCell>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Type</b></TableCell>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Cost</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResourceCostData.map((resource, index) => (
              <TableRow key={index} sx={{border:"1px solid #aaaaaa", backgroundColor: "#dee0df"}}>
                <TableCell>{resource.name}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Cost;
