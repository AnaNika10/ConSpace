import { Grid, Tabs, Tab } from "@mui/material";
import { useState } from "react";

export function SeminarTabs({
  setDay,
  dayOfSeminar,
}: {
  setDay: (a: number) => void;
  dayOfSeminar: { day: number }[];
}) {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setDay(newValue);
  };
  return (
    <Grid container justifyContent={"center"}>
      <Tabs key={value} value={value} onChange={handleChange}>
        {dayOfSeminar.length > 0 &&
          dayOfSeminar.map((it) => {
            return <Tab key={it.day} label={"Day " + it.day} value={it.day} />;
          })}
      </Tabs>
    </Grid>
  );
}
