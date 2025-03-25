import Express from "express";
import { handleCommands } from "./controllers";
import { convertTextToCommands, textIntoCommandsClient } from "./text_into_commands_client";
import { TextToCommandsRequest } from "./protos/text_to_commands/TextToCommandsRequest";
import { recordAndTranscribe, recordTranscriberClient } from "./recorder_client";


type Command = 'cursor_movement_to_line';

type Value = Partial<number | string>;


export async function listenToCommands(port: number = 3000) {
  console.log("Sent gRPC requests.");

  const deadLine = new Date();
  deadLine.setSeconds(deadLine.getSeconds() + 5);

  recordTranscriberClient.waitForReady(deadLine, (err: any) => {
    if (err) {
      console.error('Failed to connect: ' + err);
      return;
    }


  });

  const transcribedText = await recordAndTranscribe();
  const commands = await convertTextToCommands(transcribedText);
  await handleCommands(commands);
}
