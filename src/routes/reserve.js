import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    const sedan = await selectSql.getSedan();
    const suv = await selectSql.getSUV();
    const bus = await selectSql.getBus();
    const truck = await selectSql.getTruck();

    if (req.cookies.user) {
        res.render('reserve', { 
            'user': req.cookies.user,
            title: '구매 예약',
            sedan,
            suv,
            bus,
            truck
        });
    } else {
        res.render('/')
    }

});

router.post('/', async(req,res)=>{
    const data = {
        ssn : req.cookies.user,
        Vin : req.body.admitBtn
    };
    await updateSql.updateReservation(data);

    res.redirect('/reserve');
});

module.exports = router;