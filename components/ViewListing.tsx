import { BigNumber } from 'ethers'
import * as React from 'react'
import { Listing } from '../types/Listing'
import ViewNFT, { InfoElement } from './ViewNFT'

const ViewListing: React.FC<{listing: Listing}> = ({ listing }) => {
  console.log('LISTING', listing)
  return (
      <div className='border text-left'>
          <InfoElement name="price" data={BigNumber.from(listing.buyoutPrice).toString()} />
          <InfoElement name="seller" data={listing.sellerAddress} />
          <InfoElement name="quantity" data={BigNumber.from(listing.quantity).toString()} />

          <div className="px-5">
          <ViewNFT nft={listing.asset} key={listing.asset.id.hex} />
        </div>
    </div>
  )
}

export default ViewListing
