import { DialogContent, FormControl, Stack, TextField } from "@mui/material";

export function FormDialog({
  error,
  onChange,
}: {
  error: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <DialogContent>
        <FormControl>
          <Stack spacing={5}>
            <TextField
              error={error}
              onChange={onChange}
              helperText="Field must not be empty."
              id="title"
              label="Title"
              variant="filled"
              name="title"
            />
            <TextField
              error={error}
              onChange={onChange}
              helperText="Field must not be empty."
              id="content"
              multiline
              name="content"
              rows={4}
              variant="filled"
              size="medium"
              label="Note"
            />
          </Stack>
        </FormControl>
      </DialogContent>
    </>
  );
}
