import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

        <div className="text-3xl">

          Welcome to <a href="https://nextjs.org">Next.js!</a>

        </div>
    </div>
  )
}

export default Home
