import express from "express";
import { TestService } from "./service/testService";
import { TestService2 } from "./service/testService2";

// import { TestWebService } from "./util/WebService";

import routes from "./util/WebService.js";

const app = express();

const port = 3000;
// TestWebService;

// app.get("/", (req, res) => {
//   console.log(req.headers);
//   res.send("s'il vous plait");
// });

app.use(/.*?/, routes);


app.listen(port, () => {
  TestService.testMethod();
  TestService2.testMethod();
  console.log(`app is listening http://localhost:${port}`);
});

