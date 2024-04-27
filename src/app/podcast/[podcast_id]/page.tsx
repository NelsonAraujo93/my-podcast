'use client'
import { usePodcastStore } from "@/store/podcastStore";
import { useEffect } from "react";
import styles from "@/app/styles/podcastDetails.module.css";
import Track from "@/types/Track";
import Link from "next/link";

export default function Page({params} : {params: {podcast_id: string}}) {
  const tracks = usePodcastStore(state => state.tracks);
  useEffect(() => {
    if (tracks.length === 0){
      usePodcastStore.getState().getTracks(params.podcast_id, null);
    }
  }, [tracks, params.podcast_id]);

  const durationFormatter = (duration: number) => {
    if (!duration){
      return "0:00:00";
    }
    const time = new Date(duration);
    const hours = time.getHours() - 1;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
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
                  <td>
                    <Link className={styles.tdLink} href={`/podcast/${params.podcast_id}/episode/${track.trackId}`}>
                      {track.trackName}
                    </Link >
                  </td>
                  <td>{dateFormatter(track.releaseDate)}</td>
                  <td>{durationFormatter(track.trackTimeMillis)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}