'use client'
import styles from '@/app/styles/sideMenu.module.css';
import PodcastSummary from '@/app/ui/PodcastSummary';
import { usePodcastStore } from '@/store/podcastStore';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const selectedPodcast = usePodcastStore(state => state.selectedPodcast);
  useEffect(() => {
    if (!selectedPodcast) {
      usePodcastStore.getState().getPodcasts();
    }
  }, [selectedPodcast]);

  return (
    <div className={styles.dashBoard}>
      <div className={styles.sideMenu}>
       <PodcastSummary podcast={selectedPodcast} />
      </div>
        {children}
    </div>
  );
}