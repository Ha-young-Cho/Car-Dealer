import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'car_dealer',
    password: 'hyoungm41004!',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from user`);
    return rows
  },

  getSedan: async () => {
    const [rows] = await promisePool.query(`select * from getSedan`);
    return rows;
  },
  getSUV: async () => {
    const [rows] = await promisePool.query(`select * from getSUV`);
    return rows;
  },
  getBus: async () => {
    const [rows] = await promisePool.query(`select * from getBus`);
    return rows;
  },
  getTruck: async () => {
    const [rows] = await promisePool.query(`select * from getTruck`);
    return rows;
  },

  getSedanReserved: async (data) => {
    const [rows] = await promisePool.query(`select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, doors_num, color, s_SSN, DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date
    from car, sedan where sedan.Vin = car.Vin and car.c_SSN = "${data.c_ssn}" and car.purchase_date is NULL limit 3`);
    return rows;
  },
  getSUVReserved: async (data) => {
    const [rows] = await promisePool.query(`select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, size, color, s_SSN, DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, suv where suv.Vin = car.Vin and car.c_SSN = "${data.c_ssn}" and car.purchase_date is NULL limit 3`);
    return rows;
  },
  getBusReserved: async (data) => {
    const [rows] = await promisePool.query(`select car.vin, model, manufacturer, fuel_efficiency, price, seats_num, floors_num, s_SSN, DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, bus where bus.Vin = car.Vin and car.c_SSN = "${data.c_ssn}" and car.purchase_date is NULL limit 3`);
    return rows;
  },
  getTruckReserved: async (data) => {
    const [rows] = await promisePool.query(`select car.vin, model, manufacturer, fuel_efficiency, price, tonnage, wheels_num, height, s_SSN, DATE_FORMAT(reserve_date,'%Y-%m-%d') as reserve_date 
    from car, truck where truck.Vin = car.Vin and car.c_SSN = "${data.c_ssn}" and car.purchase_date is NULL limit 3`);
    return rows;
  },

  getSedanAdmin: async () => {
    const [rows] = await promisePool.query(`select * from getSedanAdmin`);
    return rows;
  },
  getSUVAdmin: async () => {
    const [rows] = await promisePool.query(`select * from getSUVAdmin`);
    return rows;
  },
  getBusAdmin: async () => {
    const [rows] = await promisePool.query(`select * from getBusAdmin`);
    return rows;
  },
  getTruckAdmin: async () => {
    const [rows] = await promisePool.query(`select * from getTruckAdmin`);
    return rows;
  },

  getSedanAdminReserved: async () => {
    const [rows] = await promisePool.query(`select * from getSedanAdminReserved`);
    return rows;
  },
  getSUVAdminReserved: async () => {
    const [rows] = await promisePool.query(`select * from getSUVAdminReserved`);
    return rows;
  },
  getBusAdminReserved: async () => {
    const [rows] = await promisePool.query(`select * from getBusAdminReserved`);
    return rows;
  },
  getTruckAdminReserved: async () => {
    const [rows] = await promisePool.query(`select * from getTruckAdminReserved`);
    return rows;
  },
}

export const updateSql = {
  updateReservation: async (data) => {
    const sql = `update car set reserve_date = now() where Vin = "${data.Vin}"`;
    const sql2 = `update customer set reserve_count = reserve_count + 1 where SSN = "${data.ssn}"`;
    const sql3 = `update car set c_SSN = "${data.ssn}" where Vin = "${data.Vin}"`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
    await promisePool.query(sql3);
  },

  cancelReservation: async (data) => {
    const sql = `update car set reserve_date = NULL where Vin = "${data.Vin}"`;
    const sql2 = `update customer set reserve_count = reserve_count - 1 where SSN = "${data.ssn}"`;
    const sql3 = `update car set c_SSN = NULL where Vin = "${data.Vin}"`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
    await promisePool.query(sql3);
  },

  updateCar:async(data)=>{
    const sql = `update car set 
    model= "${data.model}", manufacturer= "${data.manufacturer}", fuel_efficiency = ${data.fuel_efficiency},
    price= "${data.price}", s_SSN = "${data.s_SSN}" where vin = "${data.vin}"`;
    await promisePool.query(sql);

    if (`${data.doors_num}` != "undefined"){
      const sql2 = `update sedan set
      seats_num = "${data.seats_num}", doors_num = "${data.doors_num}", color = "${data.color}"
      where vin = "${data.vin}"`;
      await promisePool.query(sql2);
    }

    if (`${data.size}` != "undefined"){
      const sql3 = `update suv set
      seats_num = "${data.seats_num}", size = "${data.size}", color = "${data.color}" 
      where vin = "${data.vin}"`;
      await promisePool.query(sql3);
    }

    if (`${data.floors_num}` != "undefined"){
      const sql4 = `update bus set
      seats_num = "${data.seats_num}", floors_num = "${data.floors_num}"
      where vin = "${data.vin}"`;
      await promisePool.query(sql4);
    }
    
    if (`${data.tonnage}` != "undefined"){
      const sql5 = `update truck set
      tonnage = "${data.tonnage}", wheels_num = "${data.wheels_num}", height = "${data.height}"
      where vin = "${data.vin}"`;
      await promisePool.query(sql5);
    }
  },

  updateReserved:async(data)=>{
    const sql = `update car set 
    model= "${data.model}", manufacturer= "${data.manufacturer}", fuel_efficiency = ${data.fuel_efficiency},
    price= "${data.price}", s_SSN = "${data.s_SSN}", c_SSN = "${data.c_SSN}", reserve_date = "${data.reserve_date}" where vin = "${data.vin}"`;
    await promisePool.query(sql);

    if (`${data.doors_num}` != "undefined"){
      const sql2 = `update sedan set
      seats_num = "${data.seats_num}", doors_num = "${data.doors_num}", color = "${data.color}"
      where vin = "${data.vin}"`;
      await promisePool.query(sql2);
    }

    if (`${data.size}` != "undefined"){
      const sql3 = `update suv set
      seats_num = "${data.seats_num}", size = "${data.size}", color = "${data.color}" 
      where vin = "${data.vin}"`;
      await promisePool.query(sql3);
    }

    if (`${data.floors_num}` != "undefined"){
      const sql4 = `update bus set
      seats_num = "${data.seats_num}", floors_num = "${data.floors_num}"
      where vin = "${data.vin}"`;
      await promisePool.query(sql4);
    }

    if (`${data.tonnage}` != "undefined"){
      const sql5 = `update truck set
      tonnage = "${data.tonnage}", wheels_num = "${data.wheels_num}", height = "${data.height}"
      where vin = "${data.vin}"`;
      await promisePool.query(sql5);
    }
  },

  insertCar:async(data)=>{
    const sql = `insert car (vin, model, manufacturer, fuel_efficiency, price, c_ssn, s_ssn) values 
    ("${data.vin}", "${data.model}", "${data.manufacturer}", ${data.fuel_efficiency}, "${data.price}", null, "${data.s_SSN}")`;
    await promisePool.query(sql);

    if (`${data.doors_num}` != "undefined"){
      const sql2 = `insert sedan (vin, seats_num, doors_num, color) values
      ("${data.vin}",${data.seats_num}, ${data.doors_num},"${data.color}")`;
      await promisePool.query(sql2);
    }

    if (`${data.size}` != "undefined"){
      const sql3 = `insert suv (vin, seats_num, size, color) values
      ("${data.vin}",${data.seats_num}, "${data.size}", "${data.color}")`;
      await promisePool.query(sql3);
    }

    if (`${data.floors_num}` != "undefined"){
      const sql4 = `insert bus (vin, seats_num, floors_num) values
      ("${data.vin}",${data.seats_num}, ${data.floors_num})`;
      await promisePool.query(sql4);
    }

    if (`${data.tonnage}` != "undefined"){
      const sql5 = `insert truck (vin, tonnage, wheels_num, height) values
      ("${data.vin}",${data.tonnage}, ${data.wheels_num}, ${data.height})`;
      await promisePool.query(sql5);
    }
  },

  cancelCar:async(data)=>{
    const sql = `update car set reserve_date = null where vin = "${data.vin}"`;
    const sql2 = `update customer set reserve_count = reserve_count - 1 
    where ssn = (select c_ssn from car where vin = "${data.vin}")`;
    const sql3 = `update car set c_SSN = null where Vin = "${data.vin}"`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
    await promisePool.query(sql3);
  },

  completeCar:async(data)=>{
    const sql = `update car set purchase_date = now() where vin = "${data.vin}"`;
    const sql2 = `update customer set reserve_count = reserve_count - 1 
    where ssn = (select c_ssn from car where vin = "${data.vin}")`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
  },
}

export const deleteSql = {
  deleteSedan: async (data) => {
      const sql = `delete from sedan where vin = "${data.vin}"`;
      const sql2 = `delete from car where vin = "${data.vin}"`;
      await promisePool.query(sql);
      await promisePool.query(sql2);
  },
  deleteSuv: async (data) => {
    const sql = `delete from suv where vin = "${data.vin}"`;
    const sql2 = `delete from car where vin = "${data.vin}"`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
  },
  deleteBus: async (data) => {
    const sql = `delete from bus where vin = "${data.vin}"`;
    const sql2 = `delete from car where vin = "${data.vin}"`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
  },
  deleteTruck: async (data) => {
    const sql = `delete from truck where vin = "${data.vin}"`;
    const sql2 = `delete from car where vin = "${data.vin}"`;
    await promisePool.query(sql);
    await promisePool.query(sql2);
  },
};