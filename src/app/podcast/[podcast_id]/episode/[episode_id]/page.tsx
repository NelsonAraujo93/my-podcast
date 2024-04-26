export default function Page({params} : {params: {podcast_id: string, episode_id: string}}) {
  return <p>Episode detail podcast: {params.podcast_id}, episode: {params.episode_id}</p>;
}