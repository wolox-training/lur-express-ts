import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import cardService from '../services/cards';
import { Cards, CardsInfo } from '../types/cards';

export function getCardsInfo(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return cardService
    .getCardsInfo()
    .then((cardsInfo: CardsInfo) => res.status(HttpStatus.OK).send(cardsInfo))
    .catch(next);
}

export function getAllCards(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return cardService
    .getAllCards()
    .then((cards: Cards[]) => res.status(HttpStatus.OK).send(cards))
    .catch(next);
}
