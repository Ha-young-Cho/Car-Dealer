import express from "express";
import { selectSql, updateSql} from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    const sedan = await selectSql.getSedanAdminReserved();
    const suv = await selectSql.getSUVAdminReserved();
    const bus = await selectSql.getBusAdminReserved();
    const truck = await selectSql.getTruckAdminReserved();

    if (req.cookies.user) {
        res.render('modify', { 
            'user': req.cookies.user,
            title: '예약 차량 판매 여부',
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

    const data1 = {
        vin : req.body.delBtn
    };
    await updateSql.cancelCar(data1);

    const data2 = {
        vin : req.body.comBtn
    };
    console.log(req.body.comBtn);
    await updateSql.completeCar(data2);
    

    res.redirect('/modify');
});

module.exports = router;
