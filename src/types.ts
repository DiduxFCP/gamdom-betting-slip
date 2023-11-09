import { Response } from 'express';

export type ResponseReturnType = Response<any, Record<string, any>>;

export type AuthQueryResult = {
  rowCount: any;
  rows: Array<{
    id: number;
    user_name: string;
    password: string;
  }>;
};

export type BettingSlip = {
  id: number;
  userId: number;
  eventId: number;
  amount: number;
  winningTeamId: number;
  creationDate?: Date;
};

export type BetslipQueryResult = {
  rowCount: any;
  rows: Array<{
    id: number;
    user_id?: number;
    event_id?: number;
    amount?: number;
    winning_team_id?: number;
    creation_date?: Date;
  }>;
};
