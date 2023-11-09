import { Router } from 'express';
import { createBetslip, getBetslipByID, getAllBetslipsByUser, updateBetslipAmount, deleteBetslipByID } from './betslip-service';
import { registerUser, loginUser, authenticateToken } from './auth-service';

export const betslipRouter: Router = Router();
export const authRouter: Router = Router();

betslipRouter.post('/create', authenticateToken, createBetslip);
betslipRouter.get('/', authenticateToken, getBetslipByID);
betslipRouter.get('/all', authenticateToken, getAllBetslipsByUser);
betslipRouter.put('/', authenticateToken, updateBetslipAmount);
betslipRouter.delete('/', authenticateToken, deleteBetslipByID);
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
