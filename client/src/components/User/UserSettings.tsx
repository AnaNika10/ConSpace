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
import useRefreshToken from "../../hooks/useRefreshToken";
import { IdentityDataProvider } from "../../dataProviders/IdentityDataProvider";

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
    const updatedName = newName === "" ? decodedToken.Name : newName;
    const updatedSurname =
      newSurname === "" ? decodedToken.Surname : newSurname;

    if (newName === "" && newSurname === "") {
      setEditingName(false);
      return;
    }
    await IdentityDataProvider.updateUsername(auth.accessToken, {
      firstname: updatedName,
      lastname: updatedSurname,
    });

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
      await IdentityDataProvider.updatePassword(auth.accessToken, {
        currentpassword: oldPassword,
        newpassword: newPassword,
      });
    } catch {
      console.log("Error updating password");
    }

    setEditingPassword(false);
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>

      {/* Name Edit Dialog */}
      <NameEditDialog
        open={editingName}
        onClose={() => setEditingName(false)}
        onSave={handleNameSave}
      />

      {/* Password Edit Dialog */}
      <PasswordEditDialog
        open={editingPassword}
        onClose={() => setEditingPassword(false)}
        onSave={handlePasswordSave}
      />
    </Dialog>
  );
}
