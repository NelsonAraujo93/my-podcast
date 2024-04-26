import PodcastDetailed from "@/types/PodcastDetailed";
import Image from "next/image";

export default function PodcastSummary({podcast}: {podcast: PodcastDetailed | null}) {

  return (
    <div>
      <Image src={podcast ? podcast.artworkUrl600 : ""} alt="podcast image" width={100} height={100} />
      <h1>{podcast?.collectionName}</h1>
      <p>{podcast?.artistName}</p>
    </div>
  )
}