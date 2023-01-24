import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
const router = express.Router();

// 쿠키와 세션 모두 선언. 실제로는 쿠키만 사용함
router.use(cookieParser());

router.get('/logout', (req, res) => {
    if (req.cookies.user) { // 이미 로그인한 유저가 있는가?
        res.clearCookie('user') // user 쿠키 초기화 -> 로그아웃
        res.redirect("/"); // 다시 로그인 페이지로 이동
    } else { // 로그인한 유저가 없다면
        res.redirect("/"); // 단순하게 home으로 이동
    }
})

module.exports = router;