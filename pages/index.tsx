import type { NextPage } from 'next'
import web3config from '../web3config.json'
import nftContracts from '../contracts/nftContracts.json'
import marketPlaceContracts from '../contracts/marketplace.json'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'

import {
  useQuery
} from 'react-query'

import * as React from 'react'
import { Marketplace } from '@thirdweb-dev/sdk/dist/src/contracts'
import ViewListing from '../components/ViewListing'

// This gets called on every request

/***
 * TODOS:
 * // typing issues with NFTMetaData - _hex and attributes
 * // show nfts in wallet and give list function
 * // buy NFT ability
 * // switch to server props
 */

const Home: NextPage<{allNFTrees: string, listings: string }> = (props) => {
  const targetChain = web3config.targetChain
  const sdk = new ThirdwebSDK(web3config.targetChain)
  const marketplaceContract = sdk.getMarketplace(marketPlaceContracts[targetChain].contracts.Marketplace.address)

  // @ts-ignore TODO: resolve this type error
  //  const marketplaceContract = sdk.getMarketplace(marketPlaceContracts[targetChain].contracts.Marketplace.address)

  const activeListingsQueryState = useQuery({
    queryKey: JSON.stringify(marketplaceContract),
    queryFn: () => {
      return marketplaceContract.getActiveListings()
    },
    enabled: !!marketplaceContract
  })

  console.log('ACTIVE LISTINGS', activeListingsQueryState.data)

  if (activeListingsQueryState.isLoading) {
    return (<div className='text-2xl p-6 font-josephin font-semibold'>
      Loading...
    </div>)
  }

  return (
    <div>{
      activeListingsQueryState.data?.map((listing:any) => {
        return <ViewListing listing={listing} key={listing.id} />
      })
    } </div>
  )
}

export default Home
