import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();


// 쿠키 및 세션 설정
router.use(cookieParser());

router.get('/', (req, res) => {
    if (req.cookies.user) { // 이미 로그인한 유저라면
        if(req.cookies.user === 'admin'){
            res.render('insert', { 'user': req.cookies.user });
        }
        else {
            res.render('main', { 'user': req.cookies.user }); // main.hbs로 user에 쿠키값(고객번호) 담아 이동
        }
    } else {
        res.render('login'); // login.hbs를 렌더링
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})


// 웹에서 로그인 값을 넘겨줌
router.post('/', async (req, res) => { 
    const vars = req.body; // 사용자가 입력한 id, password
    const users = await selectSql.getUsers();
    let whoAmI = '';
    let state ='';
    let checkLogin = false;


    // map은 for loop. users의 길이만큼 돌고, user가 users[i]를 의미
    users.map((user) => {
        if (vars.id === user.id && vars.password === user.password) {
            checkLogin = true;
            if(vars.id === 'admin'){
                whoAmI = 'admin';
                state = 'admin';
            }else{
                whoAmI = user.id;
                state = 'user';
            }
        }
    })

    if(checkLogin && state ==='admin'){
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // 쿠키 유지 시간 : ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/insert');
    }
    else if (checkLogin  && state ==='user') { // true면 쿠키 설정
        res.cookie('user', whoAmI, {
            expires: new Date(Date.now() + 3600000), // 쿠키 유지 시간 : ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/'); // 초기 화면으로 돌아감 -> 위의 get으로
    } else {
        res.redirect('/');
    }
    
    

})

module.exports = router;