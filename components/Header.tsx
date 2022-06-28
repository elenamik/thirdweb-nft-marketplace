import Link from 'next/link'

import * as React from 'react'
import { useMetamask, useAddress, useDisconnect } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import { formatDisplayAddress } from '../web3utils'

const Header: React.FC = (props) => {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnectWallet = useDisconnect()
  const router = useRouter()

  return (
      <div id="hero" className="bg-slate-100 pt-6 px-6 pb-2 flex flex-row justify-between">
        <span onClick={() => { router.push('/') }} id="hero-logo" className="text-5xl font-extrabold text-left text-slate-700 font-josephin font-semibold">ThirdSea</span>
        <div id="nav" className="flex flex-row">
          <Link href={'/nfts'}>
            My Collection
          </Link>
          {!address
            ? <button onClick={connectWithMetamask} id="wallet" className="bg-slate-700 text-slate-50 text-md font-medium px-4 h-12 rounded-3xl">Connect Wallet</button>
            : <div id="account" className="flex align-middle">
                <button onClick={disconnectWallet} id="disconnect" className="bg-slate-700 text-slate-50 text-md font-medium px-4 h-12 rounded-3xl">Disconnect Wallet</button>
                <div className="p-2 text-lg text-slate-700 font-medium">
                  <span className="text-3xl font-normal">|</span>
                  <span id="address" className="p-2">{formatDisplayAddress(address)}</span>
                </div>
              </div>
          }
          </div>
      </div>
  )
}

export default Header
