import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const podcasts = [
    { id: '1', title: 'Podcast 1', description: 'Description of Podcast 1' },
    { id: '2', title: 'Podcast 2', description: 'Description of Podcast 2' },
  ];

  return (
    <div>
      <h1>Welcome to My Podcast App</h1>
      <h2>Popular Podcasts:</h2>
      <ul>
        {podcasts.map(podcast => (
          <li key={podcast.id}>
            <Link href={`/podcast/`}>
                <h3>{podcast.title}</h3>
            </Link>
            <p>{podcast.description}</p>
          </li>
        ))}
      </ul>
      <h2>Popular Episodes:</h2>
      <ul>
        {podcasts.map(podcast => (
          <li key={podcast.id}>
            <Link href={`/podcast/episode`}>
                <h3>{podcast.title}</h3>
            </Link>
            <p>{podcast.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
