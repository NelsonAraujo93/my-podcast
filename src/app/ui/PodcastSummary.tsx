import PodcastDetailed from "@/types/PodcastDetailed";
import Image from "next/image";
import styles from "@/app/styles/podcastSummary.module.css";
import Link from "next/link";
import { usePodcastStore } from "@/store/podcastStore";

export default function PodcastSummary({podcast}: {podcast: PodcastDetailed | null}) {
  return (
    <Link href={`/podcast/${podcast?.collectionId}`} onClick={usePodcastStore.getState().clearSelectedTrack}>
      <div className={styles.podcastSummary}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.imageDetail}
            src={podcast ? podcast.artworkUrl600 : "/no-image.webp"}
            alt="podcast image"
            width={200}
            height={200}
            style={{borderRadius: 4}}
          />
        </div>
        <div className={styles.mainInfo}>
          <h4><b>{podcast?.collectionName}</b></h4>
          <p><i>by {podcast?.artistName}</i></p>
        </div>
        <div className={styles.description}>
          <p>Description:</p>
          <h4><i>{podcast?.collectionExplicitness}</i></h4>
        </div>
      </div>
    </Link>
  )
}