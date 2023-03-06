import knex from 'knex'

const createConnection = async (config = {}) => {
    return await knex({
        client: 'pg',
        connection: {
            host: process.env.INSTANCE_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        ...config
    });
};

export default createConnection 