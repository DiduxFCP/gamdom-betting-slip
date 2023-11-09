import { Request, Response } from 'express';
import { pool } from '../db';
import {
  GET_BETSLIP_BY_ID_QUERY,
  INSERT_NEW_BETSLIP_QUERY,
  GET_ALL_BETSLIPS_BY_USER_QUERY,
  UPDATE_BETSLIP_AMOUNT_QUERY,
  DELETE_BETSLIP_QUERY
} from './betslip-queries';
import { BettingSlip, BetslipQueryResult, ResponseReturnType } from './types';

const createBetslip = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Create Betting Slip - POST Request');

  try {
    const { userId, eventId, amount, winningTeamId }: BettingSlip = req.body;
    const result: BetslipQueryResult = await pool.query(INSERT_NEW_BETSLIP_QUERY, [userId, eventId, amount, winningTeamId]);

    return res.status(201).json({
      success: true,
      message: 'Betting slip created successfully!',
      bettingSlipId: result.rows[0].id
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error - Failed to create betslip with: ${error}`
    });
  }
}

const getBetslipByID = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Get Betting Slip Per ID - GET Request');

  try {
    const { bettingSlipId } = req.query;
    const result: BetslipQueryResult = await pool.query(GET_BETSLIP_BY_ID_QUERY, [bettingSlipId]);

    const noBetslipFound = !result.rows.length;

    if (noBetslipFound) {
      return res.status(200).json({
        success: true,
        message: `Betting Slip does not exist with id: ${bettingSlipId}.`
      });
    }

    const {
      user_id: userId,
      event_id: eventId,
      amount,
      winning_team_id: winningTeamId,
      creation_date: creationDate
    } = result.rows[0];

    return res.status(200).json({
      success: true,
      message: 'Betting slip retrieved successfully!',
      bettingSlip: {
        userId,
        eventId,
        amount,
        winningTeamId,
        creationDate
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error - Failed to get betslip by ID with: ${error}`
    });
  }
}

const getAllBetslipsByUser = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Get All Betting Slip Per User - GET Request');

  try {
    const { userId } = req.query;
    const result: BetslipQueryResult = await pool.query(GET_ALL_BETSLIPS_BY_USER_QUERY, [userId]);

    const userBettingSlips = result.rows;

    return res.status(200).json({
      success: true,
      message: 'All Betting slips retrieved successfully!',
      bettingSlipList: userBettingSlips.map((bettingSlip) => {
        const { id, event_id: eventId, amount, winning_team_id: winningTeamId } = bettingSlip;

        return {
          id,
          eventId,
          amount,
          winningTeamId
        };
      })
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error - Failed to get all betslips by User ID with: ${error}`
    });
  }
}

const updateBetslipAmount = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Update Betting Slip Amount - PUT Request');

  try {
    const { bettingSlipId } = req.query;
    const { newAmount } = req.body;

    const result: BetslipQueryResult = await pool.query(GET_BETSLIP_BY_ID_QUERY, [bettingSlipId]);
    const noBetslipFound = !result.rows.length;

    if (noBetslipFound) {
      return res.status(200).json({
        success: true,
        message: `Betting Slip does not exist with id: ${bettingSlipId}.`
      });
    }

    await pool.query(UPDATE_BETSLIP_AMOUNT_QUERY, [newAmount, bettingSlipId]);

    return res.status(200).json({
      success: true,
      message: 'Betting Slip amount updated successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error - Failed to update betslip with: ${error}`
    });
  }
}

const deleteBetslipByID = async (req: Request, res: Response): Promise<ResponseReturnType> => {
  console.log('Delete Betting Slip - DELETE Request');

  try {
    const { bettingSlipId } = req.query;

    const result: BetslipQueryResult = await pool.query(DELETE_BETSLIP_QUERY, [bettingSlipId]);

    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: `Betting Slip does not exist with id: ${bettingSlipId}.`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Betting slip deleted successfully!'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error - Failed to delete betslip with: ${error}`
    });
  }
}

export {
  createBetslip,
  getBetslipByID,
  getAllBetslipsByUser,
  updateBetslipAmount,
  deleteBetslipByID
}
