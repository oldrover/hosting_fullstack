import { Pool } from 'pg';
import config from './config';

const client: Pool = new Pool ({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

export default client;