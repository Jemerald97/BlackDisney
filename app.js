//필요한 모듈
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
//const iamport = require("iamport");

//라우터 모음
const indexRouter = require("./routes/index");
const signRouter = require("./routes/sign_up");
const loginRouter = require("./routes/login");
const memRouter = require("./routes/member");
const gameRouter = require("./routes/game");
const reserveRouter = require("./routes/reserve");
const writeRouter = require("./routes/write");
const viewRouter = require("./routes/view");
const communityRouter = require("./routes/community");
const passRouter = require("./routes/pass");

const app = express();

// //아임포트 적용
// const Iamport = new iamport({
//   impKey: "2616929715457218",
//   impSecret:
//     "kd9QvtlJbumaHjVORplCGwrVeBidxawSnFJT94CkzYvgiq5aQqMwWesbPKpnVVfiAYbK3O4CNzT50ZgQ",
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//미들웨어 등록
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "mintchoco",
    resave: false,
    saveUninitialized: true,
  })
);

//app.use(expressValidator());

//라우터 등록
app.use("/", indexRouter);
app.use("/sign_up", signRouter);
app.use("/login", loginRouter);
app.use("/member", memRouter);
app.use("/game", gameRouter);
app.use("/reserve", reserveRouter);
app.use("/write", writeRouter);
app.use("/view", viewRouter);
app.use("/community", communityRouter);
app.use("/pass", passRouter);

//에러 처리
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
