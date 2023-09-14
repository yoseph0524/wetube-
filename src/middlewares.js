import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

// AWS s3에 접근할 수 있는 API key secret 작성
const s3 = new S3Client({
  region: "ap-northeast-2",
  Credential: {
    accesskeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

// aip연결 후 AWS 어느 bucket에 저장할지 설정
const multerUploader = multerS3({
  s3: s3,
  bucket: "wetube-yoseph", // AWS bucket name
});

export const localsMiddleware = (req, res, next) => {
  //   console.log(req.session);
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {}; // loggedin 안된 사람이 url로 접근할 때 {}로 error 방지
  // console.log(req.session);
  res.locals.siteName = "wetube"; // base.pug title에 사용
  // console.log(res.locals);
  next();
};

// login 안된 client가 url에다가 직접 users/login or /edit 치게 될 때 template화면에 들어가지니깐 이를 방지
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized"); // ("type", "message")
    return res.redirect("/login");
  }
};
// login 된 client가 url에다가 직접 users/login 치게 될 때 login화면에 들어가지니깐 이를 방지
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized"); // ("type", "message")
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
  storage: multerUploader,
});
// edit profile의 input의 파일을 받고 -> router에서 post middleware로 간 후 여기서 uploads에 file 저장 후 postEdit controller로 이동
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
  storage: multerUploader,
});

// export const thumbUpload = multer({
//   dest: "uploads/thumbs/",
//   limits: { fileSize: 3000000000 },
// });
