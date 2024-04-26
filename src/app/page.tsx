'use client'
import React, { useState, useEffect } from 'react';
import PodcastCard from '@/app/ui/PodcastCard';
import Podcast from '@/types/Podcast';
import styles from '@/app/styles/home.module.css';
import SearchInput from '@/app/ui/SearchInput';

const HomePage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[] | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/json');
        const jsonData = await response.json();
        const fetchedPodcasts = jsonData.feed.entry as Podcast[];
        setPodcasts(fetchedPodcasts);
        setFilteredPodcasts(fetchedPodcasts);  // Initialize with all podcasts
      } catch (error) {
        console.error('Failed to fetch podcasts', error);
        throw new Error('Failed to fetch podcasts');
      }
    };

    fetchPodcasts();
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = podcasts.filter(podcast => {
      const name = podcast['im:name'].label.toLowerCase();
      const author = podcast['im:artist'].label.toLowerCase();
      return name.includes(searchValue) || author.includes(searchValue);
    });
    setFilteredPodcasts(filtered);
  };

  return (
    <div className={styles.podcastContainer}>
     <div className={styles.podcastContainerHeader}>
      <div className={styles.count}>{filteredPodcasts? filteredPodcasts.length : podcasts.length}</div>
      <div className={styles.search}>
       <SearchInput handle={handleOnChange} />
        <button>Search</button>
      </div>
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
