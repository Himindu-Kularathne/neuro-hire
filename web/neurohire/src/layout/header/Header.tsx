import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { APP_DATA } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<string>("Home");
  const { setIsAuthenticated } = useAuth();

  const navigation = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleMenuItemClick = (view: string) => {
    if (view === "logout") {
      // Handle logout logic here
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsAuthenticated(false);
      return;
    }
    setSelectedView(view);
    navigation(`/${view}`);
    toggleDrawer(false)();
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#ffffff", color: "#333" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, letterSpacing: 1, color: "#1976d2" }}
          >
            {APP_DATA.APP_NAME}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            {[
              { label: "Home", view: "Home", path: "" },
              { label: "Jobs", view: "Jobs", path: "jobs/owned" },
              { label: "New Job", view: "NewJob", path: "jobs/add" },
              // { label: "Settings", view: "Settings", path: "settings" },
            ].map((nav) => (
              <Button
                key={nav.label}
                sx={{
                  color: "#333",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={() => handleMenuItemClick(nav.path)}
              >
                {nav.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt="Profile"
              src="https://via.placeholder.com/40"
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #1976d2",
                cursor: "pointer",
              }}
              onClick={toggleDrawer(true)}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer with Icons */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Profile</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />

          <List>
            {/* Links in the Drawer */}
            <ListItem button onClick={() => handleMenuItemClick("my-account")}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>

            {/* <ListItem
              button
              onClick={() => handleMenuItemClick("notifications")}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem> */}

            <ListItem button onClick={() => handleMenuItemClick("preferences")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </ListItem>

            <ListItem button onClick={() => handleMenuItemClick("logout")}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AppHeader;
