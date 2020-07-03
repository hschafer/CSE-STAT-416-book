import Head from 'next/head'
import Link from 'next/link'

import tableOfContents from '../table_of_contents.js'


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

        <ol>
          {
            tableOfContents.map((chapter) =>
              <li value={chapter.chapterNumber}><Link href={`chapters/${chapter.file}`}><a>{chapter.title}</a></Link></li>
            )
          }
        </ol>
      </main>
    </div>
  )
}
