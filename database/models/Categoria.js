module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            notNull: true
        }
    }
    let config = {
        tableName: "categoria",
        timestamps: false
    }

    const Categoria = sequelize.define(alias, cols, config);


    return Categoria;
}