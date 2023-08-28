import { Add } from "@mui/icons-material";
import FaqList from "./FaqList";
import Fab from "@mui/material/Fab";
import useAuth from "../../hooks/useAuth";
import { useDecodedToken } from "../../hooks/useTokenDecoder";
import { useEffect, useState } from "react";
import { FAQ } from "../../models/FAQ";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

export default function Faqs() {
  const { auth } = useAuth();
  const decodedToken = useDecodedToken(auth.accessToken);
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState<FAQ[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const response = await axios.get("/FAQ");

        setLoading(false);
        setError(null);
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getAllNotes();
  }, [data]);

  const handleSaveClick = async () => {
    try {
      const faq: FAQ = {
        question: newQuestion!,
        answer: newAnswer!,
      };

      const response = await axiosPrivate.post("/FAQ", JSON.stringify(faq), {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const newFaq = response.data;

      setData((prevData) => [...prevData, newFaq]);

      setAddDialogOpen(false);
      setNewQuestion("");
      setNewAnswer("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleCancelClick = () => {
    setAddDialogOpen(false);
    setNewQuestion("");
    setNewAnswer("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ConSpace FAQs</h1>
      {!isLoading && <FaqList faqs={data} />}
      {decodedToken?.Role === "Administrator" && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
          <Fab color="primary" aria-label="add" onClick={handleAddClick}>
            <Add />
          </Fab>
        </div>
      )}

      <Dialog open={isAddDialogOpen} onClose={handleCancelClick}>
        <DialogTitle>Add New FAQ</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            fullWidth
            margin="dense"
            variant="outlined"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <TextField
            label="Answer"
            multiline
            rows={4}
            fullWidth
            margin="dense"
            variant="outlined"
            value={newAnswer}
            onChange={(event) => setNewAnswer(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
