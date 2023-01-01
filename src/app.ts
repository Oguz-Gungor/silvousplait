import express from "express";
import { TestService } from "./service/testService";
import { TestService2 } from "./service/testService2";

const app = express();

const port = 3000;

app.get("/",(req,res)=>{
    res.send("s'il vous plait")
})

app.listen(port, () => {
    TestService.testMethod();
    TestService2.testMethod();
    console.log(`app is listening http://localhost:${port}`)
});
