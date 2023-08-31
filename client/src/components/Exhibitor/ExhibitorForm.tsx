import {
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton,
  Toolbar,
  FormControl,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Exhibitor } from "../../models/Exhibitor";
import { useState } from "react";
import { ExhibitorDataProvider } from "../../dataProviders/ExhibitorDataProvider";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";


const CloseButton = ({ setClose }: { setClose: () => void }) => {
  return (
    <>
      <Toolbar>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Exhibitor information
        </Typography>
        <IconButton edge="end" color="inherit" onClick={setClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};
export function ExhibitorForm({
  exhibitor,
  isOpened,
  displayEventInfo
}: {
  exhibitor: Exhibitor;
  isOpened: boolean;
  displayEventInfo: (a: boolean) => void;
}) {
  const { auth } = useAuth();

  const original: Exhibitor = JSON.parse(
    JSON.stringify(exhibitor)
  ) as typeof exhibitor;

  const [currentExhibitor, setCurrentExhibitor] = useState(original);
  const [error, setError] = useState({ name: false, stand: false });
  const decoded: any = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;
  const role = decoded?.Role || "";
  const isAdmin = role === "Administrator";
  const isInsert =
    exhibitor.exhibitorId === null || exhibitor.exhibitorId === undefined;
  const handleClose = (event: object, reason: string) => {
    if (reason && reason == "backdropClick") return;
  };
  const setClose = (isSaved: boolean) => {
    displayEventInfo(false);
    if (!isSaved) {
      setCurrentExhibitor(original);
    }
  };
  const DeleteExhibitor = async () => {
    const data = currentExhibitor.exhibitorId!;
    ExhibitorDataProvider.deleteExhibitor(data, auth.accessToken);
    setClose(true);
  };
  const UpdateExhibitor= async () => {
    if (currentExhibitor.name  && currentExhibitor.stand)
    {
   
    if (!currentExhibitor.exhibitorId) {
      ExhibitorDataProvider.insertExhibitor(currentExhibitor, auth.accessToken);
      setClose(false);
    } else {
      ExhibitorDataProvider.updateExhibitor(currentExhibitor, auth.accessToken);
      setClose(true);
    }
  }
  };
  const onChange = (e: any) => {
   if (e.target.name ==='stand' && isNaN(Number(e.target.value))) {
      setError({
        ...error,
        stand: true,
      });
      return;
    }
    if (e.target.value !== "") {
      setError({
        ...error,
        [e.target.name] : false
      });
    }
    const value = e.target.value;
    setCurrentExhibitor({
      ...currentExhibitor,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={isOpened}>
        <CloseButton setClose={() => setClose(false)} />
        <DialogContent>
          <FormControl >
            <Box
              minHeight={200}
              marginTop={5}
              component="form"
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={1} rowSpacing={5}>
                <Grid item xs={6}>
                  <TextField
                    id="exhibitor-name"
                    label="Company name"
                    error={error.name}
                    required
                    defaultValue={currentExhibitor.name}
                    name="name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="exhibitor-stand"
                    label="Stand"
                    required
                    error={error.stand}
                    helperText="Enter the number of the stand for the company"
                    defaultValue={currentExhibitor.stand}
                    name="stand"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    name="description"
                    InputProps={{
                      readOnly: !isAdmin,
                    }}
                    defaultValue={currentExhibitor.description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(event);
                    }}
                    label="About the company"
                    rows="8"
                  />
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          {isAdmin && (
            <Button onClick={UpdateExhibitor} variant="contained">
              Save
            </Button>
          )}
          {isAdmin && !isInsert && (
            <Button onClick={DeleteExhibitor} variant="contained">
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
          }


