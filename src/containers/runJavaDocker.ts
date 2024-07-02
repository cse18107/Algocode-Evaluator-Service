// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";

async function runJava(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log("Initialising a new java docker container");
  await pullImage(JAVA_IMAGE);
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java &&  javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}}' | java Main`;
  const javaDockerContainer = await createContainer(JAVA_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  // starting / booting the corresponding docker container
  await javaDockerContainer.start();

  console.log("Started the docker container");

  const loggerStream = await javaDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  await new Promise((res) => {
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
  await javaDockerContainer.remove();

  return javaDockerContainer;
}

export default runJava;
