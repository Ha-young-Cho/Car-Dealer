import express from "express";
import { selectSql, updateSql} from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    const sedan = await selectSql.getSedanAdminReserved();
    const suv = await selectSql.getSUVAdminReserved();
    const bus = await selectSql.getBusAdminReserved();
    const truck = await selectSql.getTruckAdminReserved();

    if (req.cookies.user) {
        res.render('saleinfo', { 
            'user': req.cookies.user,
            title: '차량 예약 관리',
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
    const vars = req.body;

    const data = {
        vin : vars.vin,
        model : vars.model,
        manufacturer : vars.manufacturer,
        fuel_efficiency : vars.fuel_efficiency,
        price : vars.price,
        s_SSN : vars.s_SSN,
        c_SSN : vars.c_SSN,
        reserve_date : vars.reserve_date,

        seats_num : vars.seats_num,
        doors_num : vars.doors_num,
        color : vars.color,
    
        size : vars.size,
    
        floors_num : vars.floors_num,
    
        tonnage : vars.tonnage,
        wheels_num : vars.wheels_num,
        height : vars.height
    };
    await updateSql.updateReserved(data);
    
    res.redirect('/saleinfo');
});

module.exports = router;
