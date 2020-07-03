import Head from 'next/head'
import styles from './chapter.module.css'

export default function Chapter({ children, chapterNumber, title}) {
    return <>
        <Head></Head>
        <h1 className={styles.header}>Chapter {chapterNumber}: {title}</h1>
        <main>{children}</main>
    </>
}
