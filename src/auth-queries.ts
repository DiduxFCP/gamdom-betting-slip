export const REGISTER_NEW_USER_QUERY = 'INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING id';
export const GET_USER_QUERY = 'SELECT * FROM users WHERE user_name = $1';
