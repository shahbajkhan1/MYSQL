import Express from "express";
import userRoute from "./router/user.router.js";

const app = Express()
const PORT = 7070;
app.use(Express.json())
app.use(userRoute)


app.listen(PORT, () => {
    console.log("connect your server");
})