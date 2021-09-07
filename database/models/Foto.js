module.exports = (sequelize, dataTypes) => {
    let alias = "Foto";
    let cols = {
        id_foto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },

        id_producto: {
            type: dataTypes.INTEGER,
            notNull: true
        },

        url: {
            type: dataTypes.STRING(100),
            notNull: true
        },
        
    }
    let config = {
        tableName: "foto",
        timestamps: false
    }

    const Foto = sequelize.define(alias, cols, config);


    return Foto;
}