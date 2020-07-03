import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>CSE/STAT 416 Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
            CSE/STAT 416 Book
        </h1>

        <p className="description">
            This book is designed to teach machine learning to a wide audience.
        </p>

        <h2>Table of Contents</h2>
        
        <ol start="0">
          <li><Link href="/chapters/tufte"><a>Tufte</a></Link></li>
          <li><Link href="/chapters/linear_regression"><a>Linear Regression</a></Link></li>
          <li><Link href="/chapters/assessing_performance"><a>Assessing Performance</a></Link></li>

        </ol>
      </main>
    </div>
  )
}
