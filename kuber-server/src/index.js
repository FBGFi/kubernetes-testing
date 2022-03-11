const express = require("express");
const cors = require("cors");
const fs = require("fs");

// Does this collide with Docker port? (No, Dockerfiles conf overruns this)
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const createRandomString = (length) => {
  const chars = ["a", "b", "c", "d", "!", "?", "1", "2", "3"];
  let value = "";
  let random;
  for (let i = 0; i < length; i++) {
    random = Math.ceil(Math.random() * chars.length) - 1;
    value += chars[random];
  }
  return value;
};

const writeToLog = (message) => {
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
  writeToLog("Requested from " + appID + "\n\n");
  res.json({
    status: 200,
    data: appID,
  });
});

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
        data,
      });
    }
  });
});

app.listen(port, () => {
  const logMessage = `\t${new Date().toLocaleString()}\n[server]: Server started on port: ${port}\n\n`;
  console.log(logMessage);
  writeToLog(logMessage);
});
