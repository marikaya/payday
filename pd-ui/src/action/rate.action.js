import * as constants from '../constants/rate.constants'

export function ratesUpdated(rates){
  return {
    type: constants.RATES_UPDATED,
    rates
  }
}