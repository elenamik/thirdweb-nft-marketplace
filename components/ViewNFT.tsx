import { BigNumber } from 'ethers'
import * as React from 'react'
import { NFTData } from '../types/NFTData'

const InfoElement: React.FC<{name: string, data:string}> = ({ name, data }) => {
  return <div className="p-1 text-left">
  {name}: {data}
</div>
}

const ViewNFT: React.FC<{nft: NFTData}> = ({ nft }) => {
  const attributes = nft.metadata.attributes.map((attr: {
    value: string;
    trait_type: string
  }) => {
    return <InfoElement name={attr.trait_type} data={attr.value} key={attr.trait_type} />
  })

  return (<div className='border text-left'>
    <div className="text-2xl text-center">{nft.metadata.name}</div>
    <div className="flex flex-row">
      <img className="max-w-sm" src={nft.metadata.image}/>
      <div className="px-5">
        <InfoElement name="owner" data={nft.owner} />
        <InfoElement name="description" data={nft.metadata.description} />
        <InfoElement name="id" data={BigNumber.from(nft.metadata.id.hex).toString()} />
        <div>Attributes:
          {attributes}
        </div>
      </div>
    </div>
  </div>)
}

export default ViewNFT
