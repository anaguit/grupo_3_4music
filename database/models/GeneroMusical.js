module.exports = (sequelize, dataTypes) => {
    let alias = "Genero_Musical";
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
        tableName: "genero_musical",
        timestamps: false
    }

    const Genero_Musical = sequelize.define(alias, cols, config);


    return Genero_Musical;
}