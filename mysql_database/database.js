import  Sequelize  from "sequelize";

const sql = new Sequelize("test", "root", "", {
    host: "localhost",
    dialect: "mysql",
    //logging:false,
  })
  export default sql;