import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    const data = {
        c_ssn : req.cookies.user
    }
    const sedan = await selectSql.getSedanReserved(data);
    const suv = await selectSql.getSUVReserved(data);
    const bus = await selectSql.getBusReserved(data);
    const truck = await selectSql.getTruckReserved(data);

    if (req.cookies.user) {
        res.render('reserveinfo', { 
            'user': req.cookies.user,
            title: '예약 내역 조회',
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
    await updateSql.cancelReservation(data);

    res.redirect('/reserveinfo');
});

module.exports = router;