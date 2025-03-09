import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router";

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { role } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAdminPage = () => {
    navigate("/listproductadmin");
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    localStorage.clear();
    handleCloseUserMenu();
    navigate(0);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              YUK CHECKOUT
            </Typography>
          </Link>
          {isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link
                key={1}
                sx={{ my: 2, color: "white", display: "block" }}
                to={"/cart"}
              >
                Cart
              </Link>
            </Box>
          )}
          <Box sx={{ marginLeft: "auto" }}>
            {!isAuthenticated ? (
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User"
                      src="https://i.pinimg.com/736x/c0/95/5f/c0955f9a5adac3772a4af79dd1a1e226.jpg"
                      sx={{
                        width: 40,
                        height: 40,
                        border: "2px solid white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        bgcolor: "primary.main", 
                        color: "white", 
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {role === "admin" && (
                    <MenuItem onClick={handleAdminPage}>Admin Page</MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
