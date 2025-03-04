import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  Collapse,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  TextField , Box
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const sampleProjects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"];
const services = ["Compute", "Storage", "Database", "Networking", "Security"];
const resourceTypes = {
  Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
  Storage: ["Cloud Storage", "Filestore", "Bigtable"],
  Database: ["Cloud SQL", "Firestore", "Spanner"],
  Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
  Security: ["IAM Roles", "Firewall Rules"]
};

const generateSampleData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const project = sampleProjects[i % sampleProjects.length];
    const service = services[i % services.length];
    const type = resourceTypes[service][i % resourceTypes[service].length];
    return {
      id: i + 1,
      project,
      service,
      type,
      name: `${type} ${i + 1}`,
      status: ["Running", "Stopped", "Available", "Pending"][i % 4],
      createdDate: new Date(2023, Math.floor(i / 10), (i % 28) + 1).toISOString().split("T")[0],
    };
  });
};

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const ResourcesDashboard = () => {
  const [resources, setResources] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [expandedServices, setExpandedServices] = useState({});
  const [pagination, setPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setApiStatus(apiStatusConstants.IN_PROGRESS);
      setError(null);

      // Simulated API call
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            resources: generateSampleData()
          });
        }, 1000) // Simulated network delay
      );

      // Update state with fetched data
      setResources(response.resources); // Corrected state update
      setSelectedProject(response.resources.length ? response.resources[0].project : "");
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (err) {
      setError("Failed to load resource data. Please try again.");
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleService = (service) => {
    setExpandedServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handlePageChange = (service, newPage) => {
    setPagination((prev) => ({ ...prev, [service]: { ...prev[service], page: newPage } }));
  };

  const handleRowsPerPageChange = (service, event) => {
    setPagination((prev) => ({
      ...prev,
      [service]: { rowsPerPage: parseInt(event.target.value, 10), page: 0 }
    }));
  };

  const filteredResources = resources.filter((res) =>
    res.project === selectedProject &&
    (statusFilter ? res.status === statusFilter : true) &&
    (searchTerm ? res.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const groupedByService = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.service]) acc[resource.service] = [];
    acc[resource.service].push(resource);
    return acc;
  }, {}); 

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" mb={4} fontWeight="bold">LBG CloudPulse Resources page</Typography>
       {/* Centered Loading, Error and Retry Button */}
      <Select sx={{mb:3, backgroundColor:"#006a4d", color: "white",
               "& .MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default outline color
               "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker shade on hover
               "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Change color when focused
           }} fontWeight= "bold" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} >

        {[...new Set(resources.map(res => res.project))].map((proj) => (
          <MenuItem key={proj} value={proj}>{proj}</MenuItem>
        ))}
      </Select>
      <TextField  
  placeholder="Search by Resource type..."  
  variant="outlined"  
  value={searchTerm}  
  onChange={(e) => setSearchTerm(e.target.value)}  
  sx={{
    mb: 2, 
    mx: 2,  
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default color
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker on hover
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Keep color on focus
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Prevent losing color on hover out
  }}  
/>  
      <Select value={statusFilter} sx={{mb:3, backgroundColor:"#006a4d", color: "white",
               "& .MuiSelect-icon": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Default outline color
               "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#004d36" }, // Darker shade on hover
               "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#006a4d" }, // Change color when focused
    }} fontWeight= "bold" onChange={(e) => setStatusFilter(e.target.value)} displayEmpty >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="Running">Running</MenuItem>
        <MenuItem value="Stopped">Stopped</MenuItem>
        <MenuItem value="Available">Available</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </Select>  

       {apiStatus === apiStatusConstants.IN_PROGRESS && 
            <Box height={"70vh"} display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mb: 2 }}>
              {apiStatus === apiStatusConstants.IN_PROGRESS && <CircularProgress sx={{color:"#006a4d"}} />}
              {apiStatus === apiStatusConstants.FAILURE && (
                <>
                  <Alert severity="error">{error}</Alert>
                  <Button variant="contained" backgroundColor="#006a4d" onClick={fetchData} sx={{ marginTop: 2 }}>
                    Retry
                  </Button>
                </>
              )}
            </Box>
      } 

      {Object.keys(groupedByService).map((service) => {
        const page = pagination[service]?.page || 0;
        const rowsPerPage = pagination[service]?.rowsPerPage || 5;
        const serviceResources = groupedByService[service];

        return (

          <Paper key={service} sx={{ mb: 3, p: 2, border:"1px solid #aaaaaa"}}>
            <Typography variant="p1" fontWeight={"bold"}>
              <IconButton onClick={() => toggleService(service)}>
                {expandedServices[service] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              {service} Services
            </Typography>
            <Collapse in={expandedServices[service]}>
              <Table>
                <TableHead >
                  <TableRow>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>ID</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Type</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Name</TableCell>
                    <TableCell sx={{backgroundColor:"#006a4d", color:"white"}}>Status</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Created Date</TableCell>
                    <TableCell  sx={{backgroundColor:"#006a4d", color:"white"}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resource) => (
                    <TableRow key={resource.id} sx={{ backgroundColor: "#dee0df" }}>
                      <TableCell>{resource.id}</TableCell>
                      <TableCell>{resource.type}</TableCell>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>{resource.status}</TableCell>
                      <TableCell>{resource.createdDate}</TableCell>
                      <TableCell>
                        <Button variant="contained" sx={{backgroundColor:"#006a4d"}} size="small" onClick={() => navigate(`/resource/${resource.id}`, { state: { resource } })}>View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                sx={{
                  "& .MuiTablePagination-root": { color: "white" }, // Applies to the main root container
                  "& .MuiTablePagination-selectLabel": { color: "white" }, // "Rows per page" text
                  "& .MuiSelect-icon": { color: "white" }, // Dropdown arrow icon
                  "& .MuiTablePagination-displayedRows": { color: "white" }, // Page info (e.g., 1-5 of 50)
                  "& .MuiIconButton-root": { color: "white" }, 
                  color:"white",
                }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={serviceResources.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => handlePageChange(service, newPage)}
                onRowsPerPageChange={(e) => handleRowsPerPageChange(service, e)}
              />
            </Collapse>
          </Paper>
        );

      })}
    </Container>
  );
};

export default ResourcesDashboard;
