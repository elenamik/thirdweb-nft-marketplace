/***
 * For doing various formatting of addresses, big numbers, etc
 */
import { BigNumber, BigNumberish, ethers } from 'ethers'

export const formatDisplayAddress = (address:string):string => {
  return address.slice(0, 6).concat('...').concat(address.slice(-4))
}

export const hexToETH = (num: BigNumberish):string => {
  return ethers.utils.formatEther(num)
}

export const hextoNum = (num: BigNumberish):string => {
  return BigNumber.from(num).toString()
}
