module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: '5433',
  username: 'postgres',
  password: 'docker',
  database: 'meetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
