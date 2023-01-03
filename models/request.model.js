module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("requests", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reason: {
            type: Sequelize.STRING
        },
        transport: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.DATEONLY
        },
        end_date: {
            type: Sequelize.DATEONLY
        },
        destination_city: {
            type: Sequelize.STRING
        },
        total_fees: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "WAITED"
        }
    }, {
        timestamps: true,
    });

    return Request;
};