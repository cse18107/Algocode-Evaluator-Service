import bodyParser from "body-parser";
import express, { Express } from "express";

// import runCpp from "./containers/runCpp";
import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import submissionQueueProducer from "./producers/submissionQueueProducer";
// import runJava from "./containers/runJavaDocker";
// import runPython from "./containers/runPythonDocker";
// import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import { submission_queue } from "./utils/constants";
import SampleWorker from "./workers/SampleWorker";
import SubmissionWorker from "./workers/SubmissionWorker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);
app.use("/ui", bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at port ${serverConfig.PORT}`);

  SampleWorker("SampleQueue");
  SubmissionWorker(submission_queue);

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

  //   const code = `x=input();
  // print("value of x is", x);
  // for i in range(int(x)):
  //   print("2 X",i ," = ", 2*i )
  //   `;

  // const code = `
  // import java.util.*;
  // public class Main {
  //   public static void main(String[] args) {
  //     Scanner scn = new Scanner(System.in);
  //     int input = scn.nextInt();
  //     System.out.println("input value given by user: "+ input);
  //     for(int i=0;i<input;i++){
  //       System.out.println(i);
  //     }
  //   }
  // }
  // `;

  const code = `
  #include<iostream>
  #include<stdio.h>
  using namespace std;

  int main() {
    int x;
    cin>>x;
    cout<<"Value of x is "<<x<<endl;
    for(int i=0;i<x;i++){
      cout<<i << " ";
    }
      cout<<endl;
      return 0;
  }
  `;

  const inputTestCase = `10`;

  submissionQueueProducer({
    "123": {
      language: "CPP",
      inputCase: inputTestCase,
      code,
    },
  });
  // runPython(code, inputTestCase);
  // runJava(code, inputTestCase);
  // runCpp(code, inputTestCase);
});
