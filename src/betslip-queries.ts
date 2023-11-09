export const INSERT_NEW_BETSLIP_QUERY = 'INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES ($1, $2, $3, $4) RETURNING id';
export const GET_BETSLIP_BY_ID_QUERY = 'SELECT * FROM betting_slips where id = $1';
export const GET_ALL_BETSLIPS_BY_USER_QUERY = 'SELECT * FROM betting_slips where user_id = $1';
export const UPDATE_BETSLIP_AMOUNT_QUERY = 'UPDATE betting_slips SET amount = $1 WHERE id = $2';
export const DELETE_BETSLIP_QUERY = 'DELETE FROM betting_slips WHERE id = $1';
