import express from "express";
import logger from "morgan";
import path from "path";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login"; 
import logoutRouter from './routes/logout';
import reserveRouter from "./routes/reserve";
import reserveinfoRouter from "./routes/reserveinfo";
import insertRouter from "./routes/insert";
import updateRouter from "./routes/update";
import deleteRouter from "./routes/delete";
import modifyRouter from "./routes/modify";
import saleinfoRouter from "./routes/saleinfo";

const PORT = 3000;

// 0.1초마다 refresh -> 웹에서 새로고침하지 않아도 파일이 변경되면 자동 변경
const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public'))) //hbs가 css를 불러오기 위해 경로 설정

app.use(logger("dev"));

app.use("/", loginRouter); 
app.use("/logout", logoutRouter);
app.use("/reserve", reserveRouter); //사용자의 구매 예약 페이지
app.use("/reserveinfo", reserveinfoRouter); //사용자의 예약 내역 조회 페이지
app.use("/insert", insertRouter); //관리자의 차량 등록 페이지
app.use("/update", updateRouter); //관리자의 차량 정보 수정 페이지
app.use("/delete", deleteRouter); //관리자의 차량 정보 삭제 페이지
app.use("/modify", modifyRouter); //관리자의 예약 차량 판매 여부 선택 페이지
app.use("/saleinfo", saleinfoRouter); //관리자의 예약 차량 정보 수정 페이지

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
