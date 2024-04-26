'use client'
import styles from '@/app/styles/sideMenu.module.css';
import PodcastSummary from '@/app/ui/PodcastSummary';
import { usePodcastStore } from '@/store/podcastStore';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashBoard}>
      <div className={styles.sideMenu}>
       <PodcastSummary podcast={usePodcastStore(state => state.selectedPodcast)} />
      </div>
        {children}
    </div>
  );
}