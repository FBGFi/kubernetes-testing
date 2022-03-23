import express from "express";
import cors from "cors";
import fs from "fs";
// import { exec } from "child_process";
// import k8s, { KubeConfig, CoreV1Api } from '@kubernetes/client-node';
// import axios from "axios";
import KuberClient from 'root/modules/KuberClient';

// Does this collide with Docker port? (No, Dockerfiles conf overruns this)
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const createRandomString = (length: number) => {
  const chars = ["a", "b", "c", "d", "!", "?", "1", "2", "3"];
  let value = "";
  let random;
  for (let i = 0; i < length; i++) {
    random = Math.ceil(Math.random() * chars.length) - 1;
    value += chars[random];
  }
  return value;
};

const writeToLog = (message: string) => {
  fs.writeFile("./.log", message, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const appID = createRandomString(30);


app.get("/", (req, res) => {
  // This restarts the pod automatically with no hassle (so if app crashes all is fine)
  // setTimeout(() => {
  //     console.log(`\t${new Date().toLocaleString()}\n[server]: Closing server \n`);
  //     process.exit(1);
  // },5000);
  console.log({ NAME: process.env.NAME, TITLE: process.env.TITLE, PASSWORD: process.env.password });
  writeToLog("Requested from " + appID + "\n\n");
  res.json({
    status: 200,
    data: { id: appID, env: process.env }
  });
});

app.get("/test", (req, res) => {
  // exec("", (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
  // axios.get("http://192.168.49.2:63528/api/v1/namespaces/kubernetes-dashboard/")
  //   .then((response) => res.json(response))
  //   .catch((err) => {
  //     res.json(err)
  //   })
  res.json({});
});

app.get("/api", (req, res) => {
  const client = new KuberClient();
  // wtf, doesnt work without trycatch
  try {
    client.callApi((data) => res.json(data));
  } catch (error) {
    console.log("ERROR THERE")
    console.error(error);
    res.json({status: 500, message: "Internal server error"});
  }
})

// TODO logs endpoint to save server starting logs etc
app.get("/logs", (req, res) => {
  fs.readFile("./.log", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.json({
        status: 400,
      });
    } else {
      res.json({
        status: 200,
        address: ""
      });
    }
  });
});

app.get("/roominfo/:roomName", (req, res) => {
  res.json({
    status: 200,
    address: ""
  });
})

app.listen(port, () => {
  const logMessage = `\t${new Date().toLocaleString()}\n[server]: Server started on port: ${port}\n\n`;
  console.log(logMessage);
  writeToLog(logMessage);
});

// This librarys documentation is pure garbage, lets try some hacks
// try {
//   const kc = new KubeConfig();
//   kc.loadFromDefault();
//   const k8sApi = kc.makeApiClient(CoreV1Api);

//   k8sApi.listNamespacedPod('default').then((res) => {
//     writeToLog(JSON.stringify(res.body));
//   });
// } catch (error) {
//   console.log(error);

// }
