import db from "../../../common/db";

export default async () => {
  try {
    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS Users(
        phone varchar(100) primary key,
        password text,
        name varchar(100),
        surname varchar(100)
    )
      `;

    await db.query(createUserTableQuery);

    console.log("users table ready!");

    const createUserAddressInfoTableQuery = `
    CREATE TABLE IF NOT EXISTS UserAddressInfos(
        id SERIAL primary key,
        userPhone varchar(100) REFERENCES Users(phone),
        addresstype varchar(50),
        addressdescription varchar(300),
        isactive bool
    )
      `;

    await db.query(createUserAddressInfoTableQuery);

    console.log("useraddressinfos table ready!");

    const createCardTableQuery = `
    CREATE TABLE IF NOT EXISTS cards(
        id SERIAL primary key,
        cardName varchar(100) UNIQUE,
        price numeric
    )
      `;

    await db.query(createCardTableQuery);

    console.log("cards table ready!");

    const createDeliveryTableQuery = `
    CREATE TABLE IF NOT EXISTS deliveries(
        id SERIAL primary key,
        deliveryTypeName varchar(100) UNIQUE,
        price numeric,
        countryCode int
    )
      `;

    db.query(createDeliveryTableQuery);

    console.log("deliveries table ready!");

    const createOrderTableQuery = `
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL primary key,
        userPhone varchar(100) REFERENCES users(phone),
        userAddressId int REFERENCES userAddressInfos(id),
        cardId int REFERENCES cards(id),
        deliveryId int REFERENCES deliveries(id)
    )
      `;

    await db.query(createOrderTableQuery);

    console.log("orders table ready!");
  } catch (e) {
    console.log("ERROR OCCURED!!!");
    Console.log(e);
  }
};
