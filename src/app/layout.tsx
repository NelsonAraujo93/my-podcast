'use client'
import styles from '@/app/styles/home.module.css';
import { usePodcastStore } from '@/store/podcastStore';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const loading = usePodcastStore(state => state.loading);
  const year = new Date().getFullYear();
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
            className={loading ? styles.pulse : styles.hidden}
          ></div>
        </nav>
        {children}
        <footer className={styles.footer}>
          <p>© {year} My Podcast - Nelson Araujo</p>
        </footer>
      </body>
    </html>
  );
}