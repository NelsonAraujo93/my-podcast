import styles from '@/app/ui/sideMenu.module.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashBoard}>
      <div className={styles.sideMenu}>
        <ul>
          <li><Link href="/">Home</Link></li>
        </ul>
      </div>
        {children}
    </div>
  );
}