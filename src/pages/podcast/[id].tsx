// pages/podcast/[id].tsx

import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Podcast from '../../components/Podcast';

interface PodcastPageProps {
  podcast: {
    title: string;
    description: string;
    imageUrl: string;
  };
}

const PodcastPage: React.FC<PodcastPageProps> = ({ podcast }) => {
  const router = useRouter();
  const { id } = router.query;

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Podcast Details</h1>
      <Podcast {...podcast} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch podcast IDs from your API or database
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    // Add more podcast IDs as needed
  ];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PodcastPageProps> = async ({ params }) => {
  const { id } = params as { id: string };
  
  const podcast = {
    title: `Podcast ${id}`,
    description: `Description of Podcast ${id}`,
    imageUrl: `https://example.com/podcast${id}.jpg`,
  };

  return {
    props: { podcast },
  };
};

export default PodcastPage;
