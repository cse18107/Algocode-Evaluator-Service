import bodyParser from "body-parser";
import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import runPython from "./containers/runPythonDocker";
// import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at port ${serverConfig.PORT}`);

  SampleWorker("SampleQueue");

  // sampleQueueProducer(
  //   "SampleJob",
  //   {
  //     name: "Mukesh",
  //     company: "Algobitz",
  //     position: "Full Stack Developer",
  //     location: "Remote",
  //   },
  //   2,
  // );
  // sampleQueueProducer(
  //   "SampleJob",
  //   {
  //     name: "Soumodeep",
  //     company: "Algobitz",
  //     position: "Full Stack Developer",
  //     location: "Remote",
  //   },
  //   1,
  // );
  const code = `x=input();
print("value of x is", x);
for i in range(int(x)): 
  print("2 X",i ," = ", 2*i )
  `;
  // const code = "print(input())";
  runPython(code, "100");
});
