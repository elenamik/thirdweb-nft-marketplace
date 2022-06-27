import { BigNumber } from 'ethers'
import * as React from 'react'
import { ListingNFTData } from '../types/Listing'

export const InfoElement: React.FC<{name: string, data:string}> = ({ name, data }) => {
  return <div className="p-1 text-left">
  {name}: {data}
</div>
}

const ViewNFT: React.FC<{nft: ListingNFTData}> = ({ nft }) => {
  const attributes = nft.attributes.map((attr: {
    value: string;
    trait_type: string
  }) => {
    return <InfoElement name={attr.trait_type} data={attr.value} key={attr.trait_type} />
  })

  return (<div className='border text-left'>
    <div className="text-2xl text-center">{nft.name}</div>
    <div className="flex flex-row">
      <img className="max-w-sm" src={nft.image}/>
      <div className="px-5">
        <InfoElement name="description" data={nft.description} />
        <InfoElement name="id" data={BigNumber.from(nft.id.hex).toString()} />
        <div>Attributes:
          {attributes}
        </div>
      </div>
    </div>
  </div>)
}

export default ViewNFT
