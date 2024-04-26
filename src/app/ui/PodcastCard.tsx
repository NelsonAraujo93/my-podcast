import Podcast from "@/types/Podcast";
import Image from "next/image";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <div className="card">
       <Image
        src={podcast['im:image'][1].label}
        width={+podcast['im:image'][1].attributes.height}
        height={+podcast['im:image'][1].attributes.height}
        className="card-img-top"
        alt={podcast.title.label + '-icon'}
      />
      <h2>{podcast.title.label}</h2>
      <p>Author: {podcast['im:artist'].label}</p>
    </div>
  );
};
