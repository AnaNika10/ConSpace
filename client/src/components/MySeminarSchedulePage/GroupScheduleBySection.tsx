import {
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
} from "@mui/material";
import { useState } from "react";

const mainGroupingBy = {
  byLocation: [
    { resourceName: "conferenceRoomId" },
    { resourceName: "speakerIds" },
  ],
  bySpeakers: [
    { resourceName: "speakerIds" },
    { resourceName: "conferenceRoomId" },
  ],
};

function SelectGrouping({
  groupName,
  setGroupName,
  setGrouping,
  setMain,
}: {
  groupName: string;
  setGroupName: (a: string) => void;
  setGrouping: (a: { resourceName: string }[]) => void;
  setMain: (a: boolean) => void;
}) {
  const groupings = [
    { value: "Speakers", resourceName: "speakerIds" },
    { value: "Location", resourceName: "conferenceRoomId" },
    { value: "Location and Speakers", resourceName: "conferenceRoomId" },
  ];
  const handleChange = (event: SelectChangeEvent) => {
    const selected = groupings.find((it) => it.value === event.target.value);
    setGroupName(selected === undefined ? "" : selected.value);
    let grouping: { resourceName: string }[];
    switch (selected?.value) {
      case "Speakers":
        grouping = [{ resourceName: "speakerIds" }];
        break;
      case "Location":
        grouping = [{ resourceName: "conferenceRoomId" }];
        break;
      case "Location and Speakers":
        setMain(true);
        grouping = mainGroupingBy.byLocation;
        break;
      default:
        grouping = [];
        break;
    }
    setGrouping(grouping);
  };
  return (
    <>
      <InputLabel>Group by</InputLabel>
      <Select value={groupName} onChange={handleChange} displayEmpty>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Location"}>Location</MenuItem>
        <MenuItem value={"Speakers"}>Speakers</MenuItem>
        <MenuItem value={"Location and Speakers"}>
          Location and Speakers
        </MenuItem>
      </Select>
    </>
  );
}
export default function GroupByScheduleSection({
  selectGrouping,
  selectedBoth,
  isGroupedByDate,
  setGroupByDate,
  isBoth,
  numberOfGroups,
}: {
  selectGrouping: (group: { resourceName: string }[]) => void;
  selectedBoth: (both: boolean) => void;
  isGroupedByDate: boolean;
  setGroupByDate: (groupByDate: boolean) => void;
  isBoth: boolean;
  numberOfGroups: number;
}) {
  const [groupName, setGroupName] = useState("");
  const [mainGroup, setMain] = useState("Location");
  const selectGroupName = (name: string) => setGroupName(name);

  const handleGrouping = (event: SelectChangeEvent) => {
    if (event.target.value === "Location" || event.target.value === undefined) {
      selectGrouping(mainGroupingBy.byLocation);
    } else {
      selectGrouping(mainGroupingBy.bySpeakers);
    }
    setMain(event.target.value === undefined ? "Location" : event.target.value);
  };
  return (
    <>
      <Grid
        justifyContent="space-around"
        alignItems="center"
        container
        direction="column"
      >
        <Stack>
          <SelectGrouping
            groupName={groupName}
            setGroupName={selectGroupName}
            setGrouping={selectGrouping}
            setMain={selectedBoth}
          />
          {!isBoth || numberOfGroups !== 2 ? null : (
            <>
              <InputLabel>Switch</InputLabel>
              <Select value={mainGroup} onChange={handleGrouping}>
                <MenuItem value={"Location"}>Location</MenuItem>
                <MenuItem value={"Speakers"}>Speakers</MenuItem>
              </Select>
            </>
          )}
          {numberOfGroups === 0 ? null : (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isGroupedByDate}
                    onChange={(e) => setGroupByDate(e.target.checked)}
                  />
                }
                label="Group by date"
              />
            </FormGroup>
          )}
        </Stack>
      </Grid>
    </>
  );
}
