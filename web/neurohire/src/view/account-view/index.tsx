import React, {useState, useEffect} from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Chip,
} from "@mui/material";

const company = {
  profile_id: "cmp-001",
  profile_name: "TechNova Innovations",
  profile_description: "Empowering businesses with next-gen AI solutions.",
  profile_email: "contact@technova.com",
  profile_phone: "+1 987 654 3210",
  profile_website: "https://technova.com",
  profile_address: "456 Silicon Avenue, San Francisco, CA",
  profile_logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDdhzKlfFGHIjvFFByRL-tNdsbIU4H4a3Hg&s",
  active: true,
};

interface CompanyProfile {
    profile_id: string;
    profile_name: string;
    profile_description: string;
    profile_email: string;
    profile_phone: string;
    profile_website: string;
    profile_address: string;
    profile_logo: string;
    active: boolean;
}

const CompanyProfileView: React.FC = () => {
    const [profile, setProfile] = useState<CompanyProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    // function to fetch company profile data
    const fetchCompanyProfile = async () => {
      
    }




  return (
    <Box sx={{ p: 4 }}>
      {/* Logo and Title Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Avatar
          src={company.profile_logo}
          alt={company.profile_name}
          sx={{ width: 80, height: 80, bgcolor: "#fff", border: "1px solid #ddd" }}
        />
        <Box>
          <Typography variant="h4" fontWeight={600}>
            {company.profile_name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {company.profile_description}
          </Typography>
          <Chip
            label={company.active ? "Active" : "Inactive"}
            color={company.active ? "success" : "default"}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Info Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Company ID
            </Typography>
            <Typography>{company.profile_id}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography>{company.profile_email}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography>{company.profile_phone}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Website
            </Typography>
            <Typography
              sx={{
                color: "primary.main",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => window.open(company.profile_website, "_blank")}
            >
              {company.profile_website}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Address
            </Typography>
            <Typography>{company.profile_address}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyProfileView;
