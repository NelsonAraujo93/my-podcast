import styles from '@/app/ui/home.module.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={styles.html}>
      <head>
        <title>My Site</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      </head>
      <body className={styles.body}>
        <nav className={styles.navBar}>
          <h1>Podcaster</h1>
          <div>Pulse animatiion</div>
        </nav>
        {children}
        <footer className={styles.footer}>
          <p>© 2021 My Site</p>
        </footer>
      </body>
    </html>
  );
}