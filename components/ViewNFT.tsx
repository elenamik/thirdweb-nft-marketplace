import { BigNumber } from 'ethers'
import * as React from 'react'
import InfoElement from './InfoElement'
import { NFTMetadata } from '@thirdweb-dev/sdk'

const ViewNFT: React.FC<{nft: NFTMetadata}> = ({ nft }) => {
  const attributes = nft.attributes?.map((attr: {
    value: string;
    trait_type: string
  }) => {
    return <InfoElement name={attr.trait_type} data={attr.value} key={attr.trait_type} />
  })
  console.log(nft)

  return (<div className='text-left'>
    <div className="flex flex-row">
      <img className="max-w-sm" src={nft.image!}/>
      <div className="px-5">
        <InfoElement name="description" data={nft.description!} />
        <InfoElement name="id" data={BigNumber.from(nft.id.hex).toString()} />
        <div><span className="font-bold">Attributes</span>
          {attributes}
        </div>
      </div>
    </div>
  </div>)
}

export default ViewNFT
