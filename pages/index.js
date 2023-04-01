import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

//почему сосульки и леденцы не назвали наоборот?

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Poll test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.page}>
          <div className={styles.poll}>
            <h1>Fuck yeah!</h1>
          </div>
          <div className={styles.footer}><a href="https://www.flaticon.com/free-icons/lollipop" title="lollipop icons">Lollipop icons created by Smashicons - Flaticon</a></div>
        </div>
      </main>
      
    </>
  )
}
