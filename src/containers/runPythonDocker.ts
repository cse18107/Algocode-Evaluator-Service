// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runPython(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log("Initialising a new python docker container");
  let runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo ${inputTestCase} | python3 test.py`;
  // runCommand = runCommand.replace(/'/g, `'\\"`)
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
  //   `echo "${code}" > test.py && echo ${inputTestCase} | python3 test.py`,
  // ]);

  // starting / booting the corresponding docker container
  await pythonDockerContainer.start();

  console.log("Started the docker container");

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  // eslint-disable-next-line no-unused-vars
  loggerStream.on("end", (_chunk) => {
    console.log(rawLogBuffer);
    const completeBuffer = Buffer.concat(rawLogBuffer);
    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream)
  });

  return pythonDockerContainer;
}

export default runPython;
