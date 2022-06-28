import type { NextPage } from 'next'
import * as React from 'react'
import { useAddress } from '@thirdweb-dev/react'

const Nfts: NextPage<{allNFTrees: string, listings: string }> = (props) => {
  const address = useAddress()

  console.log('address', address)

  return (
    <div id="container" className="font-roboto">
        hi
    </div>
  )
}

export default Nfts
