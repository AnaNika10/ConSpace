import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";
import { useDecodedToken } from "../../hooks/useTokenDecoder";
import { FAQ } from "../../models/FAQ";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface FaqProps {
  faqs: FAQ[];
}

export default function FaqList({ faqs }: FaqProps) {
  const { auth } = useAuth();
  const decodedToken = useDecodedToken(auth.accessToken);
  const axiosPrivate = useAxiosPrivate();

  const [expanded, setExpanded] = useState<string[]>([]);
  const [editedFaq, setEditedFaq] = useState<FAQ | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleChange =
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded((prevExpanded) => [...prevExpanded, panel]);
      } else {
        setExpanded((prevExpanded) =>
          prevExpanded.filter((item) => item !== panel)
        );
      }
    };

  const handleEditClick = (faq: FAQ) => {
    setEditedFaq(faq);
    setOpenEditDialog(true);
  };

  const handleEditSave = async () => {
    setOpenEditDialog(false);

    try {
      const faq: FAQ = {
        questionId: editedFaq?.questionId!,
        question: editedFaq?.question!,
        answer: editedFaq?.answer!,
      };
      await axiosPrivate.put("/FAQ", JSON.stringify(faq), {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCancel = () => {
    setOpenEditDialog(false);
    setEditedFaq(null);
  };

  const handleDeleteClick = async (faq: FAQ) => {
    try {
      await axiosPrivate.delete(`FAQ/${faq.questionId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            margin: "0 auto",
            marginBottom: "16px",
          }}
        >
          <Accordion
            expanded={expanded.includes(`panel${index}`)}
            onChange={handleChange(`panel${index}`)}
            style={{ width: "100%" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ width: "100%" }}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
          {decodedToken?.Role === "Administrator" && (
            <div>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditClick(faq)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteClick(faq)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
      ))}

      <Dialog open={openEditDialog} onClose={handleEditCancel}>
        <DialogTitle>Edit FAQ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Question"
              fullWidth
              margin="dense"
              variant="outlined"
              value={editedFaq?.question || ""}
              onChange={(event) =>
                setEditedFaq((prevFaq) => ({
                  ...prevFaq!,
                  question: event.target.value,
                }))
              }
            />
            <TextField
              label="Answer"
              multiline
              rows={4}
              fullWidth
              margin="dense"
              variant="outlined"
              value={editedFaq?.answer || ""}
              onChange={(event) =>
                setEditedFaq((prevFaq) => ({
                  ...prevFaq!,
                  answer: event.target.value,
                }))
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
