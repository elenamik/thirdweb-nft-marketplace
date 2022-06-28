import { BigNumber, BigNumberish, ethers } from 'ethers'
import * as React from 'react'
import InfoElement from './InfoElement'
import { DirectListing } from '@thirdweb-dev/sdk/dist/node'
import { formatDisplayAddress, hexToETH, hextoNum } from '../web3utils'

const ViewListing: React.FC<{listing: DirectListing}> = ({ listing }) => {
  const [viewMore, setViewMore] = React.useState(false)
  const handleListingClick = () => {
    setViewMore(true)
  }
  const ref = React.useRef()

  React.useEffect(() => {
    const closeViewMore = (event: PointerEvent) => {
      console.log('E', event.target)
      console.log('REF', ref.current)
      // @ts-ignore
      if (viewMore & !ref.current.contains(event.target)) {
        setViewMore(false)
      }
    }
    // @ts-ignore
    document.body.addEventListener('click', closeViewMore)
    // @ts-ignore
    return () => document.body.removeEventListener('click', closeViewMore)
  }, [])

  return (
      <div id="content-container" className="">
          <button ref={ref} onClick={handleListingClick} className='relative z-0 text-left border rounded-3xl min-w-400 max-w-400 m-6 hover:shadow-lg active:scale-105 duration-50 transition ease-in-out'>
              <img id="image" className="border-0 rounded-t-3xl max-w-md" src={listing.asset.image!}/>
              <div id="image-metadata" className="flex space-between justify-between p-3 border-0 rounded-b-3xl bg-slate-300 text-slate-700">
                  <div id="title" className="my-auto text-4xl font-josephin font-semibold">{listing.asset.name} (#{hextoNum(listing.asset.id)})</div>
                  <div id="sell-data" className="flex flex-col">
                      <InfoElement name="Listing Price" data={`${hexToETH(listing.buyoutPrice)} ⧫` }/>
                      <InfoElement name="Seller" data={formatDisplayAddress(listing.sellerAddress)} />
                  </div>
              </div>
              {viewMore && <div id="viewMoreOverlay" className="absolute top-0 bg-slate-400 z-10 w-full h-full">test</div>}
          </button>

      </div>

  )
}

export default ViewListing
