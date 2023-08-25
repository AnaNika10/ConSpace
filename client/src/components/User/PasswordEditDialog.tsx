import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

  const handleSave = () => {
    onSave(oldPassword, newPassword);
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
