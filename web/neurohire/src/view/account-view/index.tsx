/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { useUser } from "../../context/UserContext";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { profile } = useUser();

  useEffect(() => {}, [profile]);

  return (
    <Box sx={{ p: 4 }}>
      {/* Logo and Title Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Avatar
          src={profile.profile_logo}
          alt={profile.profile_name}
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#fff",
            border: "1px solid #ddd",
          }}
        />
        <Box>
          <Typography variant="h4" fontWeight={600}>
            {profile.profile_name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {profile.profile_description}
          </Typography>
          <Chip
            label={profile.active ? "Active" : "Inactive"}
            color={profile.active ? "success" : "default"}
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
            <Typography>{profile.profile_id}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography>{profile.profile_email}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography>{profile.profile_phone}</Typography>
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
              onClick={() => window.open(profile.profile_website, "_blank")}
            >
              {profile.profile_website}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Address
            </Typography>
            <Typography>{profile.profile_address}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyProfileView;
