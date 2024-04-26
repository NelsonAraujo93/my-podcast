'use client'
import { usePodcastStore } from "@/store/podcastStore";
import { useEffect } from "react";
import styles from "@/app/styles/podcastDetails.module.css";

export default function Page({params} : {params: {podcast_id: string}}) {
  const selectedPodcast = usePodcastStore(state => state.selectedPodcast);
  const tracks = usePodcastStore(state => state.tracks);

  useEffect(() => {
    usePodcastStore.getState().getTracks(params.podcast_id);
  }, [params.podcast_id]);


  return (
    <div className={styles.detailsContianer}>
     <div className={styles.episodesCounterContainer}>
        <h2>Episodes</h2>
        <div className={styles.episodesCounter}>{tracks.length}</div>
        </div>
    </div>
  )
}