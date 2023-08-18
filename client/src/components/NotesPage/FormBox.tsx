import { Box, Button, Dialog, DialogActions } from "@mui/material";
import { FormDialog } from "./FormDialog";

export function FormBox({
  open,
  handleClose,
  onSubmit,
  error,
  isFilled,
}: {
  open: boolean;
  handleClose: () => void;
  onSubmit: (e: any) => void;
  error: boolean;
  isFilled: (e: any) => void;
}) {
  return (
    <>
      <Box minHeight={100}>
        <Dialog open={open} onClose={handleClose}>
          <Box component="form" onSubmit={onSubmit}>
            <FormDialog error={error} onChange={isFilled} />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </>
  );
}
