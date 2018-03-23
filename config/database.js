module.exports = {
    'password': encodeURIComponent(process.env.DB_PASS),
    'user': encodeURIComponent(process.env.DB_USER),
    'host': process.env.DB_HOST,
    'database': process.env.DB_DATABASE,
    'options': process.env.DB_OPTIONS
};