import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { APP }    from '@/constants/config'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.icon}>
        404
      </div>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className={styles.actions}>
        <Link href={ROUTES.HOME}  className="btn btn-blue">Back home</Link>
        <Link href={ROUTES.APPLY} className="btn btn-orange">Apply now</Link>
      </div>
    </main>
  )
}
