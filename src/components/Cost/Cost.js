import React from "react";
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for monthly costs (Replace with API fetch in production)
const monthlyCostData = [
  { month: "Jan", cost: 1200 },
  { month: "Feb", cost: 950 },
  { month: "Mar", cost: 1100 },
  { month: "Apr", cost: 1300 },
  { month: "May", cost: 900 },
  { month: "Jun", cost: 1250 },
];

// Mock data for resource-specific costs
const resourceCostData = [
  { name: "VM Instance 1", type: "Compute Engine", cost: "$300" },
  { name: "Cloud SQL DB", type: "Database", cost: "$250" },
  { name: "Storage Bucket A", type: "Storage", cost: "$180" },
  { name: "BigQuery Dataset", type: "Analytics", cost: "$400" },
  { name: "Cloud Function X", type: "Serverless", cost: "$150" },
];

const Cost = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography fontWeight={"bold"} variant="h5" sx={{ mb: 2 }}>CloudPulse Cost Monitoring</Typography>

      {/* Monthly Cost Bar Chart */}
      <Paper sx={{ p: 2, mb: 3, border:"1px solid #aaaaaa", backgroundColor:"#dee0df" }}>
        <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>Monthly Cost Overview</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyCostData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" fill="#006a4d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Resource-Specific Cost Table */}
      <Paper sx={{ p: 2, border:"1px solid #aaaaaa" }}>
        <Typography variant="h6" sx={{ mb: 2 }} fontWeight={"bold"}>Resource-wise Cost Breakdown</Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Name</b></TableCell>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Type</b></TableCell>
              <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}><b>Cost</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceCostData.map((resource, index) => (
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
