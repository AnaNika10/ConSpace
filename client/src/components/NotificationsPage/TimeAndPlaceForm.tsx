import { DialogContent, FormControl, Stack, TextField } from "@mui/material";

export function TimeAndPlaceForm({
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
              helperText="Field must be in format HH:mm"
              id="time"
              label="Time"
              variant="filled"
              name="time"
            />
            <TextField
              error={error}
              onChange={onChange}
              id="place"
              name="place"
              variant="filled"
              size="medium"
              label="Place"
            />
          </Stack>
        </FormControl>
      </DialogContent>
    </>
  );
}
