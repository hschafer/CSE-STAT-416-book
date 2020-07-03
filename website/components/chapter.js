import Head from 'next/head'
import styles from './chapter.module.css'

export default function Chapter({ children, chapterNumber, title}) {
    return <>
        <main>
            <article>
            <h1>Chapter {chapterNumber}: {title}</h1>
            {children}
            </article>    
        </main>
    </>
}
