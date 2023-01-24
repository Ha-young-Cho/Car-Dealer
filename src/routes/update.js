import express from "express";
import { selectSql, updateSql} from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    const sedan = await selectSql.getSedanAdmin();
    const suv = await selectSql.getSUVAdmin();
    const bus = await selectSql.getBusAdmin();
    const truck = await selectSql.getTruckAdmin();

    if (req.cookies.user) {
        res.render('update', { 
            'user': req.cookies.user,
            title: '차량 정보 수정',
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

        seats_num : vars.seats_num,
        doors_num : vars.doors_num,
        color : vars.color,
    
        size : vars.size,
    
        floors_num : vars.floors_num,
    
        tonnage : vars.tonnage,
        wheels_num : vars.wheels_num,
        height : vars.height
    };
    
    await updateSql.updateCar(data);
    
    res.redirect('/update');
});

module.exports = router;
