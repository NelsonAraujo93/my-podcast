import styles from '@/app/styles/home.module.css';
import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={styles.html}>
      <head>
        <title>My Podcast - By Nelson Araujo</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      </head>
      <body className={styles.body}>
        <nav className={styles.navBar}>
          <Link
            href="/"
            className={styles.link}
          >Podcaster</Link>
          <div
            className={styles.pulse}
          ></div>
        </nav>
        {children}
        <footer className={styles.footer}>
          <p>© 2024 My Podcast - Nelson Araujo</p>
        </footer>
      </body>
    </html>
  );
}