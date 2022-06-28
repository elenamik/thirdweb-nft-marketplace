import type { NextPage } from 'next'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'

import {
  useQuery
} from 'react-query'

import * as React from 'react'
import ViewListing from '../components/ViewListing'
import { AuctionListing, DirectListing } from '@thirdweb-dev/sdk/dist/src/types/marketplace'
import { MarketPlaceContractAddress } from '../config/contractAddresses'
import { targetChain } from '../config/targetChain'
import { useChainId } from '@thirdweb-dev/react'

/***
 * TODOS:
 * // typing issues with NFTMetaData - attributes
 * // show NFTs in wallet
 * // give ability to list
 * // buy NFT ability
 * // can get desiredChainID from the context? rn its hardcoded wrong in index.tsx
 */

const Home: NextPage = () => {
  const sdk = new ThirdwebSDK(targetChain)
  const marketplaceContract = sdk.getMarketplace(MarketPlaceContractAddress[targetChain])

  const activeListingsQueryState = useQuery<(AuctionListing | DirectListing)[]>(
    {
      queryFn: () => {
        return marketplaceContract.getActiveListings()
      }
    })

  if (activeListingsQueryState.isLoading) {
    return (<div className='text-2xl p-6 font-josephin font-semibold'>
      Loading...
    </div>)
  }
  return (
    <div className="flex flex-wrap justify-center">{
      activeListingsQueryState.data?.map((listing:any) => {
        return <ViewListing listing={listing} key={listing.id} />
      })
    } </div>
  )
}

export default Home
