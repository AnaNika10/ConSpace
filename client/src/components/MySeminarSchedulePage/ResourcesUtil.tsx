import { Appointment } from "../../models/Appointment";

interface SpeakerWithId {
  text: string;
  id: number;
}
export abstract class ResourceUtil {
  public static getLocations(
    data: Appointment[]
  ): { text: string; id: string }[] {
    const uniqueSet = new Set<string>();
    const uniqueObjects: { text: string; id: string }[] = [];

    data.forEach((it: Appointment) => {
      if (!uniqueSet.has(it.location)) {
        uniqueSet.add(it.location);
        uniqueObjects.push({ text: it.location, id: it.location });
      }
    });

    return uniqueObjects;
  }

  public static getSpeakers(appointments: Appointment[]): SpeakerWithId[] {
    const speakerDict: { [id: number]: string } = {};

    appointments.forEach((appointment) => {
      appointment.speakerIds.forEach((id, index) => {
        if (!speakerDict[id]) {
          speakerDict[id] = appointment.speakers[index];
        }
      });
    });

    const uniqueSpeakerObjects: SpeakerWithId[] = Object.keys(speakerDict).map(
      (id) => ({
        text: speakerDict[parseInt(id, 10)],
        id: parseInt(id, 10),
      })
    );

    return uniqueSpeakerObjects;
  }
  public static mapResources(data: Appointment[]) {
    return [
      {
        id: 0,
        fieldName: "location",
        instances: this.getLocations(data),
        title: "Location",
      },
      {
        id: 1,
        fieldName: "speakerIds",
        instances: this.getSpeakers(data),
        allowMultiple: true,
        title: "Speakers",
      },
    ];
  }
}
