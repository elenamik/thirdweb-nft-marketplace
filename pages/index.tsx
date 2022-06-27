import type { NextPage } from 'next'
import web3config from '../web3config.json'
import nftContracts from '../contracts/nftContracts.json'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import * as React from 'react'
import { NFTData } from '../types/NFTData'
import ViewNFT from '../components/ViewNFT'

// This gets called on every request
export async function getStaticProps () {
  const targetChain = web3config.targetChain
  const sdk = new ThirdwebSDK(web3config.targetChain)

  // @ts-ignore TODO: resolve this type error
  const nftTreeContract = sdk.getNFTCollection(nftContracts[targetChain].contracts.NFTREE.address)
  const allNFTrees = await nftTreeContract.getAll()
  // Pass data to the page via props
  return { props: { allNFTrees: JSON.stringify(allNFTrees) } }
}

const Home: NextPage<{allNFTrees: string}> = (props) => {
  const allNFTrees = JSON.parse(props.allNFTrees) as NFTData[]
  const nfts = allNFTrees.map((nft: NFTData) => {
    return <ViewNFT nft={nft} key={nft.metadata.id.hex} />
  })

  return (
    <div className="m-2 text-center">
      <div className="text-3xl text-center" >
        🌳 NFTree Collection 🌳
      </div>
      {nfts}
    </div>
  )
}

export default Home
