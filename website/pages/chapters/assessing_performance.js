import Chapter from '../../components/chapter'

import Link from 'next/link'

export default function AssessingPerformance() {
    return <>
        <Chapter fileName='assessing_performance'>
            <p>This is some assessing Performance text <Link href="/chapters/linear_regression"><a>Lin reg</a></Link>.</p>
        </Chapter>
    </>
}
