import axios from 'axios';
import config from '../../config';
import { externalApiError } from '../errors';
import logger from '../logger';
import { CardsInfo, Cards } from '../types/cards';

export const BASE_URL = config.heartstone.baseURL as string;
export const API_KEY = config.heartstone.APIKey as string;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'x-rapidapi-host': BASE_URL,
    'x-rapidapi-key': API_KEY
  }
});

export async function getCardsInfo(): Promise<CardsInfo> {
  try {
    const response = await client.get<CardsInfo>('info');
    return response.data;
  } catch (error) {
    logger.error(`getCardsInfo Error ${error}`);
    throw new externalApiError(`External Api Error ${error}`);
  }
}

export async function getAllCards(): Promise<Cards[]> {
  try {
    const response = await client.get<Cards[]>('cards');
    return response.data;
  } catch (error) {
    logger.error(`getCardsInfo Error ${error}`);
    throw new externalApiError(`External Api Error ${error}`);
  }
}

export default {
  getCardsInfo,
  getAllCards
};
