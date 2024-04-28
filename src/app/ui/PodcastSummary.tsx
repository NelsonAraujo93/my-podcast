import Image from "next/image";
import styles from "@/app/styles/podcastSummary.module.css";
import Link from "next/link";
import { usePodcastStore } from "@/store/podcastStore";
import Podcast from "@/types/Podcast";

export default function PodcastSummary({podcast}: {podcast: Podcast | null}) {
  console.log(podcast);
  return (
    <Link href={`/podcast/${podcast?.id.attributes['im:id']}`} onClick={usePodcastStore.getState().clearSelectedTrack}>
      <div className={styles.podcastSummary}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.imageDetail}
            src={podcast ? podcast["im:image"][2].label : "/no-image.webp"}
            alt="podcast image"
            width={200}
            height={200}
            style={{borderRadius: 4}}
          />
        </div>
        <div className={styles.mainInfo}>
          <h4><b>{podcast?.["im:name"].label}</b></h4>
          <p><i>by {podcast?.["im:artist"].label}</i></p>
        </div>
        <div className={styles.description}>
          <p>Description:</p>
          <h4><i>{podcast?.summary.label}</i></h4>
        </div>
      </div>
    </Link>
  )
}