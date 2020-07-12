import Chapter from '../../components/chapter'

import Link from 'next/link'
import Latex from 'react-latex'

export default function AssessingPerformance() {
    return <>
        <Chapter fileName='assessing_performance'>
            <p>This is some assessing Performance text <Link href="/chapters/linear_regression"><a>Lin reg</a></Link>.</p>

            <p>
                This paragraph will have some inline LaTeX in it. <Latex>Some math $3 + 2 \rightarrow 5$</Latex>
            </p>

            <p>This paragraph has some in block display

                <Latex displayMode={true}>$$\min_x f(x)$$</Latex>
            </p>
        </Chapter>
    </>
}
