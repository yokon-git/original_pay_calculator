import express from "express";
import logger from "morgan";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import {initErrors} from "./middlewares/init_errors";
import {homeRouter} from "./routes/home";
import {paySplitRouter} from "./routes/pay_split";
import {payTotalRouter} from "./routes/pay_total";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.use(initErrors);
app.use("/", homeRouter);
app.use("/pay-split", paySplitRouter);
app.use("/pay-total", payTotalRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
