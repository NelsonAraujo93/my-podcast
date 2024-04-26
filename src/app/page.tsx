import React from 'react';
import PodcastCard from '@/app/ui/PodcastCard';
import Podcast from '@/types/Podcast';

const HomePage = async () => {
  const podcasts = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/json');
  const podcastJson = await podcasts.json();
  const podcastsArray = podcastJson.feed.entry as Podcast[];
  console.log(podcastJson);
  debugger;
  if (!podcasts.ok) {
    throw new Error('Failed to fetch podcasts');
  }

  return (
    <div>
      <h1>Welcome to My Podcast App</h1>
      <h2>Popular Podcasts:</h2>
      <ul>
      {
        podcastsArray.map((podcast: Podcast) => (
          <li key={podcast.id.label}>
            <PodcastCard podcast={podcast} />
          </li>
        ))
      }
      </ul>
      
    </div>
  );
};

export default HomePage;
