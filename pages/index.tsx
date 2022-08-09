import type { NextPage } from 'next'

/*import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'*/


import AppWrapper from "../components/AppWrapper";
import Shortener from "../components/Shortener";
import LinksTable from "../components/LinksTable";

const Home: NextPage = () => {
  return (
    <AppWrapper>
      <Shortener />
      <LinksTable />
    </AppWrapper>
  )
}

export default Home
