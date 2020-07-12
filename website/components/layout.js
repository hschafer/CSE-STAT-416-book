import Link from 'next/link'

import tableOfContents from '../table_of_contents.js'

import styles from './layout.module.css'



export default function Layout({ showTOC="True", children }) {
    return <div id="container">
        <nav id="navbar" className={showTOC === "True" ? "" : styles.hidden}>
            <p><Link href="/"><a>&#8592; Back Home</a></Link></p>
            <ol>
            {
                tableOfContents.map((chapter) =>
                <li key={chapter.file} value={chapter.chapterNumber}><Link href={`/chapters/${chapter.file}`}><a>{chapter.title}</a></Link></li>
                )
            }
            </ol>
        </nav>
        <main id="content">
            {children}
        </main>
        <style jsx>{`
            a {
                color: red;
                underline: none;
                background: none;
            }

            #container {
                display: flex;
                align-items: stretch;
            }

            #navbar {
                min-width: 250px;
                max-width: 250px;
            }
        `}</style>
    </div>
}