import type { NextPage } from 'next'
import web3config from '../web3config.json'
import nftContracts from '../contracts/nftContracts.json'
import marketPlaceContracts from '../contracts/marketplace.json'
import { NFTCollection, ThirdwebSDK } from '@thirdweb-dev/sdk'
import * as React from 'react'
import { Listing } from '../types/Listing'
import ViewListing from '../components/ViewListing'

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

/***
 * Q's:
 * is getStaticProps the right approach?
 * approach of adding config for chains + contracts in contracts/config.
 * can we generate types from ABIS?
 * how attentive do we want to do to typing
 * weird typing errors
 *
 *
 * // show nfts in wallet and give list function
 * // buy NFT ability
 */

const Home: NextPage<{allNFTrees: string, listings: string }> = (props) => {
  const listings = JSON.parse(props.listings) as Listing[]
  const viewListings = listings.map((listing: Listing) => {
    return <ViewListing listing={listing} key={listing.id} />
  })
  const [s, setS] = React.useState('')

  React.useEffect(() => {
    // if (typeof window !== 'undefined') {
    setS('hello')
    // }
  }, [])

  return (
    <div className="m-2 text-center">
      <div className="text-3xl text-center font-extrabold" >
        🥳 MY NFT Marketplace 🥳
        s: {s}
      </div>
      {viewListings}
    </div>
  )
}

export default Home
