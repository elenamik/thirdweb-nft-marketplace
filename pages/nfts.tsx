import type { NextPage } from 'next'
import web3config from '../web3config.json'
import nftContracts from '../contracts/nftContracts.json'
import marketPlaceContracts from '../contracts/marketplace.json'
import { NFTCollection, ThirdwebSDK, DirectListing } from '@thirdweb-dev/sdk'
import Link from 'next/link'

import * as React from 'react'
import ViewListing from '../components/ViewListing'
import { useMetamask, useAddress, useDisconnect } from '@thirdweb-dev/react'

// This gets called on every request
export async function getStaticProps () {
  console.log('Loading Static Props')
  const targetChain = web3config.targetChain
  const sdk = new ThirdwebSDK(web3config.targetChain)

  // @ts-ignore TODO: resolve this type error
  const nftTreeContract: NFTCollection = sdk.getNFTCollection(nftContracts[targetChain].contracts.NFTREE.address)
  const allNFTrees = await nftTreeContract.getAll()

  // @ts-ignore TODO: resolve this type error
  const marketplaceContract = sdk.getMarketplace(marketPlaceContracts[targetChain].contracts.Marketplace.address)
  console.log('marketplace contract loaded')
  const listings = await marketplaceContract.getActiveListings()

  return { props: { allNFTrees: JSON.stringify(allNFTrees), listings: JSON.stringify(listings) } }
}
const formatDisplayAddress = (address:string):string => {
  return address.slice(0, 6).concat('...').concat(address.slice(-4))
}

/***
 * TODOS:
 * // typing issues with NFTMetaData - _hex and attributes
 * // show nfts in wallet and give list function
 * // buy NFT ability
 * // switch to server props
 */

const Nfts: NextPage<{allNFTrees: string, listings: string }> = (props) => {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnectWallet = useDisconnect()

  console.log('address', address)

  const listings = JSON.parse(props.listings) as DirectListing[]
  const viewListings = listings.map((listing: DirectListing) => {
    return <ViewListing listing={listing} key={listing.id} />
  })

  return (
    <div id="container" className="font-roboto">
   hi
    </div>
  )
}

export default Nfts
