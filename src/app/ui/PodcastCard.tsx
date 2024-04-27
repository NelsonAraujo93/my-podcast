import Podcast from "@/types/Podcast";
import Image from "next/image";
import styles from "@/app/styles/podcastCard.module.css";
import Link from "next/link";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Link className={styles.cardContainer} href={`/podcast/${podcast.id.attributes["im:id"]}`}>
      <div className={styles.card}>
        <Image
          src={podcast['im:image'][2].label}
          width={+podcast['im:image'][2].attributes.height}
          height={+podcast['im:image'][2].attributes.height}
          className={styles.image}
          alt={podcast['im:name'].label + '-icon'}
        />
        <p className={styles.cardText}>{podcast['im:name'].label}</p>
        <p className={styles.author}>Author: {podcast['im:artist'].label}</p>
      </div>
    </Link>
  );
};
