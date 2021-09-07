module.exports = (sequelize, dataTypes) => {
    let alias = "roles";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            isNull: true,
            autoIncrement: true
        },
        
        nombre: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        
    
    }

    let config = {
        tableName: "roles",
        timestamps: false
    }

    const roles = sequelize.define(alias, cols, config);


    return roles;
}