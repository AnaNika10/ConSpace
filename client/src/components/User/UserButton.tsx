import React, { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useAuth from "../../hooks/useAuth";
import { useDecodedToken } from "../../hooks/useTokenDecoder";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import SettingsDialog from "./UserSettings";

const StyledPopoverContent = styled("div")(({ theme }) => ({
  minWidth: "250px",
  maxHeight: "400px",
  padding: theme.spacing(2),
}));

export default function UserButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const decodedToken = useDecodedToken(auth.accessToken);
  const user_name = decodedToken.Name;
  const user_surname = decodedToken.Surname;
  const user_email = decodedToken.Email;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleOpenSettings = () => {
    setSettingsOpen(true);
    handleClose();
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <div>
      <Button onClick={handleClick} startIcon={<Avatar>{user_name[0]}</Avatar>}>
        {user_name} <ArrowDropDown />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <StyledPopoverContent>
          <Stack spacing={1} p={2}>
            <Stack spacing={1} alignItems="center">
              <Avatar>{user_name[0]}</Avatar>
              <Typography variant="subtitle1">
                {user_name} {user_surname}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "15px", color: "grey" }}
              >
                {user_email}
              </Typography>
            </Stack>
            <Divider />
            <Button fullWidth variant="outlined" onClick={handleOpenSettings}>
              Settings
            </Button>
            <Button fullWidth variant="outlined" onClick={signOut}>
              Sign Out
            </Button>
          </Stack>
        </StyledPopoverContent>
      </Popover>
      <SettingsDialog open={settingsOpen} onClose={handleCloseSettings} />
    </div>
  );
}
