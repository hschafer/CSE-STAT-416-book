import Head from 'next/head'

import Layout from './layout'
import tableOfContents from '../table_of_contents'

import styles from './chapter.module.css'


function findChapterInfo(fileName) {
    const chapter = tableOfContents.filter(chapter => chapter.file === fileName);

    if (chapter.length == 0) {
        throw 'File name not found';
    } else if (chapter.length > 1) {
        throw 'File name not unique';
    }

    return chapter[0];
}

export default function Chapter({ children, fileName}) {
    const chapter = findChapterInfo(fileName);
    return <Layout>
        <Head>
            <link
                href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
                rel="stylesheet"
            />
        </Head>

        <main>
            <article>
            <h1>Chapter {chapter.chapterNumber}: {chapter.title}</h1>
            {children}
            </article>
        </main>
    </Layout>
}
