import { Appointment } from "../../models/Appointment";

type ReduceReturnType = {
  speakers: string[];
  speakerIds: string[];
};

export abstract class ResourceUtil {
  public static getSpeakers(data: Appointment[]) {
    const dict: { [id: string]: string } = {};
    const speakersWithIds = data
      .map((it: Appointment) => {
        return { speakers: it.speakers, speakerIds: it.speakerIds };
      })
      .reduce<ReduceReturnType>(
        (acc, curr) => {
          return {
            speakers: acc.speakers.concat(curr.speakers),
            speakerIds: acc.speakerIds.concat(curr.speakerIds),
          };
        },
        { speakers: [], speakerIds: [] }
      );

    speakersWithIds.speakerIds.forEach((id, index) => {
      if (dict[id] === undefined) {
        dict[id] = speakersWithIds.speakers[index];
      }
    });
    const result = [];
    for (const key in dict) {
      result.push({ text: dict[key], id: key });
    }
    return [...new Set(result)];
  }
  public static mapResources(data: Appointment[]) {
    return [
      {
        id: 0,
        fieldName: "conferenceRoomId",
        instances: [
          ...new Set(
            data.map((it: Appointment) => {
              return { text: it.location, id: it.conferenceRoomId };
            })
          ),
        ],
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
