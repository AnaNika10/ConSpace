import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface NameEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, surname: string) => void;
}

export default function NameEditDialog({
  open,
  onClose,
  onSave,
}: NameEditDialogProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSave = () => {
    onSave(name, surname);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "500px", maxHeight: "70vh" } }}
    >
      <DialogTitle>Edit Name and Surname</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
