import Link from 'next/link'
import styles from './chapter.module.css'

export default function Chapter({ children, chapterNumber, title}) {
    return <>
        <main>
            <article>
            <p><Link href="/"><a>&#8592; Back Home</a></Link></p>
            <h1>Chapter {chapterNumber}: {title}</h1>
            {children}
            </article>    
        </main>
    </>
}
