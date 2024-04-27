'use client'
import React, { useState, useEffect } from 'react';
import PodcastCard from '@/app/ui/PodcastCard';
import Podcast from '@/types/Podcast';
import styles from '@/app/styles/home.module.css';
import SearchInput from '@/app/ui/SearchInput';
import { usePodcastStore } from '@/store/podcastStore';

const HomePage: React.FC = () => {
  const podcasts = usePodcastStore(state => state.podcasts);
  const filteredPodcasts = usePodcastStore(state => state.filteredPodcasts);

  useEffect(() => {
    usePodcastStore.getState().clearSelectedPodcast();
    if (podcasts.length === 0) {
      usePodcastStore.getState().getPodcasts();
    }
  }, [podcasts]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    usePodcastStore.getState().searchPodcasts(searchValue);
  };

  return (
    <div className={styles.podcastContainer}>
      <div className={styles.podcastContainerHeader}>
        <div className={styles.count}>Results: {filteredPodcasts ? filteredPodcasts.length : podcasts.length}</div>
        <SearchInput handle={handleOnChange} />
      </div>
      <ul className={styles.podcastList}>
        {
          filteredPodcasts ? (
            filteredPodcasts.length > 0 ? (
              filteredPodcasts.map((podcast: Podcast) => (
                <li key={podcast.id.label}>
                  <PodcastCard podcast={podcast} />
                </li>
              ))
            ) : (
              <li>No podcasts found</li>
            )
          ) : (
            podcasts.map((podcast: Podcast) => (
              <li key={podcast.id.label}>
                <PodcastCard podcast={podcast} />
              </li>
            ))
          )
        }
      </ul>

    </div>
  );
};

export default HomePage;
