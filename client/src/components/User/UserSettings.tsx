import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import NameEditDialog from "./NameEditDialog"; // Import your NameEditDialog
import PasswordEditDialog from "./PasswordEditDialog"; // Import your PasswordEditDialog
import useAuth from "../../hooks/useAuth";
import { useDecodedToken } from "../../hooks/useTokenDecoder";
import axios from "../../api/axios";
import {
  UPDATE_USER_NAME_SURNAME_URL,
  UPDATE_USER_PASSWORD_URL,
} from "../../constants/api";
import useRefreshToken from "../../hooks/useRefreshToken";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { auth } = useAuth();
  const decodedToken = useDecodedToken(auth.accessToken);
  const refresh = useRefreshToken();

  const [editingName, setEditingName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(decodedToken.Name || "");
  const [surname, setSurname] = useState(decodedToken.Surname || "");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(decodedToken.Name || "");
    setSurname(decodedToken.Surname || "");
  }, [auth]);

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleEditPassword = () => {
    setEditingPassword(true);
  };

  const handleNameSave = async (newName: string, newSurname: string) => {
    let updatedName = newName === "" ? decodedToken.Name : newName;
    let updatedSurname = newSurname === "" ? decodedToken.Surname : newSurname;

    if (newName === "" && newSurname === "") {
      setEditingName(false);
      return;
    }

    await axios.put(
      UPDATE_USER_NAME_SURNAME_URL,
      JSON.stringify({ firstname: updatedName, lastname: updatedSurname }),
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    await refresh();

    setName(updatedName);
    setSurname(updatedSurname);
    setEditingName(false);
  };

  const handlePasswordSave = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      await axios.put(
        UPDATE_USER_PASSWORD_URL,
        JSON.stringify({
          currentpassword: oldPassword,
          newpassword: newPassword,
        }),
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setError(null);
    } catch {
      setError(
        "Something went wrong while updating your password. Please try again."
      );
    }

    setEditingPassword(false);
  };

  const clearErrors = () => {
    setError(null);
  };

  const handleClose = () => {
    clearErrors();
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "500px", maxHeight: "70vh" } }}
    >
      <DialogTitle>Account Settings</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: "16px" }}>
          <Typography>
            {name} {surname}
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={handleEditName}
            style={{ padding: "0", textTransform: "none" }}
          >
            Change name and surname
          </Button>
        </div>

        <Divider style={{ margin: "16px 0" }} />

        <div style={{ marginTop: "16px" }}>
          <Typography variant="subtitle1">Password</Typography>
          <Button
            variant="text"
            color="primary"
            onClick={handleEditPassword}
            style={{ padding: "0", textTransform: "none" }}
          >
            Change password
          </Button>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>

      <NameEditDialog
        open={editingName}
        onClose={() => setEditingName(false)}
        onSave={handleNameSave}
      />

      <PasswordEditDialog
        open={editingPassword}
        onClose={() => setEditingPassword(false)}
        onSave={handlePasswordSave}
      />
    </Dialog>
  );
}
