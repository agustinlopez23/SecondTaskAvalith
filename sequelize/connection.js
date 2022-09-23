const { Sequelize} = require("sequelize");
require('dotenv').config()
// {process.env.DATABASE_NAME,
// process.env.DATABASE_USER,
// process.env.DATABASE_PASSWORD,
// process.env.DATABASE_HOST,
// process.env.DATABASE_DIALECT}

//Coneccting to DB
const sequelize = new Sequelize(process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  });

//Conecction test with Sequelize
const testSequelizeConnection = async(res, req)=>{

    {try {
        await sequelize.authenticate();
        
        return (console.log('Connection has been established successfully.'), {ok:"ok"});

      } catch (error) {
        
        return (console.error('Unable to connect to the database:', error),{ok:"notok"});
        
      }}

}





module.exports= {testSequelizeConnection, sequelize, Sequelize}