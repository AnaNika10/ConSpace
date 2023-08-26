import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../../api/axios";
import { LOGIN_URL } from "../../constants/api";
import useAuth from "../../hooks/useAuth";
import { useDecodedToken } from "../../hooks/useTokenDecoder";

interface PasswordEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (oldPassword: string, newPassword: string) => void;
}

export default function PasswordEditDialog({
  open,
  onClose,
  onSave,
}: PasswordEditDialogProps) {
  const { auth, setAuth } = useAuth();
  const decodedToken = useDecodedToken(auth.accessToken);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(true);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const clearFields = () => {
    setOldPassword("");
    setNewPassword("");

    setIsOldPasswordCorrect(true);
    setOldPasswordError("");
    setNewPasswordError("");
  };

  const handleSave = async () => {
    const oldPasswordValidation = validateOldPassword(oldPassword);
    const newPasswordValidation = validateNewPassword(newPassword);

    if (oldPasswordValidation.isValid && newPasswordValidation.isValid) {
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({
            email: decodedToken.Email,
            password: oldPassword,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setAuth({
          accessToken: response?.data.accessToken,
          refreshToken: response?.data.refreshToken,
        });

        // console.log(response?.data.accessToken);

        if (response?.data.accessToken) {
          setIsOldPasswordCorrect(true);

          onSave(oldPassword, newPassword);

          clearFields();
        } else {
          setIsOldPasswordCorrect(false);
        }
      } catch (error) {
        setOldPasswordError("Incorrect old password");
      }
    } else {
      setOldPasswordError(oldPasswordValidation.error);
      setNewPasswordError(newPasswordValidation.error);
    }
  };

  const validateOldPassword = (password: string) => {
    if (!password) {
      return {
        isValid: false,
        error: "Old Password is required",
      };
    }

    if (password === newPassword) {
      return {
        isValid: false,
        error: "Old Password cannot be the same as the New Password",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  };

  const validateNewPassword = (password: string) => {
    if (!password) {
      return {
        isValid: false,
        error: "New Password is required",
      };
    }

    if (password.length < 8) {
      return {
        isValid: false,
        error: "Password must be more than 8 characters",
      };
    }

    if (password.length > 32) {
      return {
        isValid: false,
        error: "Password must be less than 32 characters",
      };
    }

    if (!/\d/.test(password)) {
      return {
        isValid: false,
        error: "Password must contain at least one digit",
      };
    }

    if (password === oldPassword) {
      return {
        isValid: false,
        error: "New Password cannot be the same as the Old Password",
      };
    }

    return {
      isValid: true,
      error: "",
    };
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "500px", maxHeight: "70vh" } }}
    >
      <DialogTitle>Edit Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Old Password"
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          fullWidth
          margin="dense"
          error={Boolean(oldPasswordError)}
          helperText={
            !isOldPasswordCorrect ? (
              <Typography variant="caption" color="error">
                Old Password is incorrect
              </Typography>
            ) : (
              <Typography variant="caption" color="error">
                {oldPasswordError}
              </Typography>
            )
          }
          InputProps={{
            endAdornment: (
              <IconButton onClick={handlePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="dense"
          error={Boolean(newPasswordError)}
          helperText={
            <Typography variant="caption" color="error">
              {newPasswordError}
            </Typography>
          }
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleNewPasswordVisibility} edge="end">
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            clearFields();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
