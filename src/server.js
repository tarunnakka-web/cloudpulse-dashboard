const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for frontend requests
app.use(cors());

// Define the API response
app.get("/api/resources", (req, res) => {
  res.json({
    services: ["Compute", "Storage", "Database", "Networking", "Security"],
    resourceTypes: {
      Compute: ["VM Instances", "Kubernetes Clusters", "Cloud Run"],
      Storage: ["Cloud Storage", "Filestore", "Bigtable"],
      Database: ["Cloud SQL", "Firestore", "Spanner"],
      Networking: ["VPC Networks", "Load Balancers", "Cloud DNS"],
      Security: ["IAM Roles", "Firewall Rules"]
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
