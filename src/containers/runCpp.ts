// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";

async function runCpp(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log("Initialising a new cpp docker container");
  await pullImage(CPP_IMAGE);
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp &&  g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}}' | stdbuf -oL -eL ./main`;
  const cppDockerContainer = await createContainer(CPP_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  // starting / booting the corresponding docker container
  await cppDockerContainer.start();

  console.log("Started the docker container");

  const loggerStream = await cppDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  const response = await new Promise((res) => {
    // eslint-disable-next-line no-unused-vars
    loggerStream.on("end", (_chunk) => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });

  //remove the container
  await cppDockerContainer.remove();

  return response;
}

export default runCpp;
