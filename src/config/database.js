module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    // criar duas colunas em todas as tabelas: created_at e updated_at
    timestamps: true,

    // diz para Sequelize criar as colunas com padrão Snake Case.
    // Por padrão Sequelize usa o padrão Camel Case
    underscored: true,

    // semelhante ao underscored, porém para nomes de tabelas
    underscoredAll: true
  }
}
