import random

korean2 = '가나다라마바사아자차카타파하'
korean3 = '고노도로모보소오조초코토포호'
korean4 = '구누두루무부수우주추쿠투푸후'
alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

manufacturerList = ['HYUNDAI', 'KIA', 'SSANGYONG', 'BMW', 'TESLA', 'TOYOTA', 'LANDROVER', 'MINI', 'VOLVO', 'HONDA', 'CHEVROLET', 'BENZ']
s_SSN_list = ['1234567890','2345678901','3456789012','4567890123','5678901234','6789012345','7890123456','8901234567','9012345678','0123456789']
bus_seats_num_list = [20, 25, 31, 35, 40, 45]
tonnageList = [1, 1.5, 2.5, 3.5, 4.5, 10]
heightList = [0.65, 0.79, 1, 1, 1.2, 1.4]
sizeList = ['소형', '중형', '대형']
colorList = ['black', 'dark grey', 'light grey', 'white', 'beige', 'light blue', 'silver']

base_Car = "INSERT INTO CAR (Vin, model, manufacturer, fuel_efficiency, price, s_SSN) VALUES "
base_Sedan = "INSERT INTO Sedan (Vin, seats_num, doors_num, color) VALUES "
base_SUV = "INSERT INTO SUV (Vin, seats_num, size, color) VALUES "
base_Bus = "INSERT INTO Bus (Vin, seats_num, floors_num) VALUES "
base_Truck = "INSERT INTO Truck (Vin, tonnage, wheels_num, height) VALUES "

sql = []
for i in range(100100):
    if i % 10000 == 0: print(i)

    #vin 설정
    vin = ""
    for j in range(0, 11):
        index = random.randint(0, len(alphabet)-1);
        vin = vin + alphabet[index]
    vin_num = random.randint(111111, 999999)
    vin = vin + str(vin_num)

    #model 설정
    idx1 = random.randint(0, len(korean2)-1)
    idx2 = random.randint(0, len(korean2)-1)
    idx3 = random.randint(0, len(korean2)-1)
    idx4 = random.randint(0, len(korean2)-1)
    idx5 = random.randint(0, len(korean2)-1)
    model = korean2[idx1] + korean3[idx2] + korean4[idx3] + korean2[idx4] + korean4[idx5]
    
    #manufacturer 설정
    n_idx = random.randint(0, 11)
    manufacturer = manufacturerList[n_idx]

    #fuel_efficiency 설정
    fuel_efficiency = round(random.uniform(10, 25),1)

    #price 설정
    price = random.randint(20000000, 100000000)

    #s_SSN 설정
    ss_idx = random.randint(0,9)
    s_SSN = s_SSN_list[ss_idx]

    #sedan 설정
    se_seats_num = random.randint(2,5)
    doors_num = random.randint(2,5)
    c1_idx = random.randint(0, 6)
    se_color = colorList[c1_idx]

    #suv 설정
    su_seats_num = random.randint(4,7)
    s_idx = random.randint(0, 2)
    size = sizeList[s_idx]
    c2_idx = random.randint(0, 6)
    su_color = colorList[c2_idx]

    #bus 설정
    b_idx = random.randint(0, 5)
    b_seats_num = bus_seats_num_list[b_idx]
    floors_num = random.randint(1,2) 

    #truck 설정
    t_idx = random.randint(0, 5)
    tonnage = tonnageList[t_idx]
    while True:
        temp = random.randint(4,20)
        if temp %2 == 0 :
            wheels_num = temp
            break
    height = heightList[t_idx]
    

    #sql 구문 연결
    query1 = base_Car + '("' + vin + '", "' + model + '", "' + manufacturer + '", ' + str(fuel_efficiency) + ', ' + str(price) + ', "' + s_SSN + '");\n'
    car_idx = random.randint(0, 3)
    if car_idx == 0:
        query2 = base_Sedan + '("' + vin + '", ' + str(se_seats_num) + ', ' + str(doors_num) + ', "' + se_color + '");\n'
    elif car_idx == 1:
        query2 = base_SUV + '("' + vin + '", ' + str(su_seats_num) + ', "' + size + '", "' + su_color + '");\n'
    elif car_idx == 2:
        query2 = base_Bus + '("' + vin + '", ' + str(b_seats_num) + ', ' + str(floors_num) + ');\n'
    else:
        query2 = base_Truck + '("' + vin + '", ' + str(tonnage) + ', ' + str(wheels_num) + ', ' + str(height) + ');\n'
    query = query1 + query2
    sql.append(query);

f = open('createCar100000.sql', 'w')
for i, s in enumerate(sql):
    f.writelines(s)

f.close()