// components/Podcast.tsx

import Image from 'next/image';
import React from 'react';

interface PodcastProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Podcast: React.FC<PodcastProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="podcast">
      <Image src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Podcast;
