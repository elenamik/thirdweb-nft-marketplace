import { BigNumber } from 'ethers'
import * as React from 'react'
import InfoElement from './InfoElement'
import ViewNFT from './ViewNFT'
import { DirectListing } from '@thirdweb-dev/sdk/dist/node'

const ViewListing: React.FC<{listing: DirectListing}> = ({ listing }) => {
  return (
      <div className='border-8 text-left p-8 border-4 rounded-3xl m-4'>
          <div className="text-2xl font-semibold">{listing.asset.name}</div>
          <InfoElement name="price" data={BigNumber.from(listing.buyoutPrice).toString()} />
          <InfoElement name="seller" data={listing.sellerAddress} />
          <InfoElement name="quantity" data={BigNumber.from(listing.quantity).toString()} />

          <div className="">
          <ViewNFT nft={listing.asset} key={listing.asset.id._hex} />
        </div>
    </div>
  )
}

export default ViewListing
