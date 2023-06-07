import { Sequelize, DataTypes } from 'sequelize';
import sql from '../mysql_database/database.js';

const user = sql.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    otp: {
        type: DataTypes.INTEGER(50),
        allowNull: false
    },
    verify_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: true
});

sql.sync();
export default user;