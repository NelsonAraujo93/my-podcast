'use client'
import { usePodcastStore } from "@/store/podcastStore";
import { useEffect } from "react";
import styles from "@/app/styles/podcastDetails.module.css";
import Track from "@/types/Track";
import Link from "next/link";

export default function Page({params} : {params: {podcast_id: string}}) {
  const tracks = usePodcastStore(state => state.tracks);
  useEffect(() => {
    usePodcastStore.getState().getTracks(params.podcast_id);
  }, [params.podcast_id]);

  const durationFormatter = (duration: number) => {
    const time = new Date(duration);
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    return `${minutes}:${seconds}`;
  }

  const dateFormatter = (date: string) => {
    const time = new Date(date);
    return time.toLocaleDateString();
  }

  return (
    <div className={styles.detailsContainer}>
     <div className={styles.episodesCounterContainer}>
        <div className={styles.episodesCounter}>Episodes: {tracks.length}</div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track: Track) => (
              <tr key={track.trackId}>
                <Link className={styles.tdLink} href={`/podcast/${params.podcast_id}/episode/${track.trackId}`}>
                  <td>{track.trackName}</td>
                  <td>{dateFormatter(track.releaseDate)}</td>
                  <td>{durationFormatter(track.trackTimeMillis)}</td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}