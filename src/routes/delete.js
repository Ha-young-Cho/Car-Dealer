import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    const sedan = await selectSql.getSedanAdmin();
    const suv = await selectSql.getSUVAdmin();
    const bus = await selectSql.getBusAdmin();
    const truck = await selectSql.getTruckAdmin();

    if (req.cookies.user) {
        res.render('delete', { 
            'user': req.cookies.user,
            title: '차량 정보 삭제',
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

    if(req.body.delBtn1 != ''){
        const data = {
            ssn : req.cookies.user,
            vin : req.body.delBtn1,
        };
        await deleteSql.deleteSedan(data);
    }

    if(req.body.delBtn2 != ''){
        const data = {
            ssn : req.cookies.user,
            vin : req.body.delBtn2,
        };
        await deleteSql.deleteSuv(data);
    }

    if(req.body.delBtn3 != ''){
        const data = {
            ssn : req.cookies.user,
            vin : req.body.delBtn3,
        };
        await deleteSql.deleteBus(data);
    }

    if(req.body.delBtn4 != ''){
        const data = {
            ssn : req.cookies.user,
            vin : req.body.delBtn4,
        };
        await deleteSql.deleteTruck(data);
    }

    res.redirect('/delete');
});

module.exports = router;
