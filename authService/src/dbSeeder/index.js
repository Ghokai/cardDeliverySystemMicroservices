import db from "../../../common/db";

export default () => {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS Users(
        phone varchar(100) primary key,
        password text,
        name varchar(100),
        surname varchar(100)
    )
      `;

  db.query(createUserTableQuery)
    .then(res => {
      console.log("users table ready!");
    })
    .catch(err => {
      console.log(err);
    });

  const createUserAddressInfoTableQuery = `
    CREATE TABLE IF NOT EXISTS UserAddressInfos(
        id SERIAL primary key,
        userPhone varchar(100) REFERENCES Users(phone),
        addresstype varchar(50),
        addressdescription varchar(300),
        isactive bool
    )
      `;

  db.query(createUserAddressInfoTableQuery)
    .then(res => {
      console.log("useraddressinfos table ready!");
    })
    .catch(err => {
      console.log(err);
    });

  const createCardTableQuery = `
    CREATE TABLE IF NOT EXISTS cards(
        id SERIAL primary key,
        cardName varchar(100) UNIQUE,
        price numeric
    )
      `;

  db.query(createCardTableQuery)
    .then(res => {
      console.log("cards table ready!");
    })
    .catch(err => {
      console.log(err);
    });

  const createDeliveryTableQuery = `
    CREATE TABLE IF NOT EXISTS deliveries(
        id SERIAL primary key,
        deliveryTypeName varchar(100) UNIQUE,
        price numeric,
        countryCode int
    )
      `;

  db.query(createDeliveryTableQuery)
    .then(res => {
      console.log("deliveries table ready!");
    })
    .catch(err => {
      console.log(err);
    });

  const createOrderTableQuery = `
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL primary key,
        userPhone varchar(100) REFERENCES users(phone),
        userAddressId int REFERENCES userAddressInfos(id),
        cardId int REFERENCES cards(id),
        deliveryId int REFERENCES deliveries(id)
    )
      `;

  db.query(createOrderTableQuery)
    .then(res => {
      console.log("orders table ready!");
    })
    .catch(err => {
      console.log(err);
    });
};
