'use client'
import styles from '@/app/styles/episodeDetails.module.css';
import { usePodcastStore } from '@/store/podcastStore';
import { useEffect } from 'react';

export default function Page({params} : {params: {podcast_id: string, episode_id: string}}) {
  const podcast = usePodcastStore(state => state.selectedPodcast);
  const selectedTrack = usePodcastStore(state => state.selectedTrack);
  useEffect(() => {
    if(podcast === null){
      usePodcastStore.getState().getTracks(params.podcast_id, params.episode_id);
    } else {
      usePodcastStore.getState().chooseTrack(params.episode_id);
    }
  }, [podcast, params.podcast_id, params.episode_id]);

  return (
    <div className={styles.episodeDetailsContainer}>
      <div className={styles.episodeDetails}>
        <h1>{selectedTrack?.trackName}</h1>
        <p>{selectedTrack?.description}</p>
        <audio className={styles.musicPlayer} controls>
          <source src={selectedTrack?.episodeUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}