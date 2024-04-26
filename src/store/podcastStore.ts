import Podcast from '@/types/Podcast';
import PodcastDetailed from '@/types/PodcastDetailed';
import Track from '@/types/Track';
import { get } from 'http'
import { create } from 'zustand'

type PodcastStore = {
  podcasts: Podcast[];
  selectedPodcast: PodcastDetailed | null;
  filteredPodcasts: Podcast[] | null;
  tracks: Track[];
  selectedTrack: Track | null
}

type Actions = {
  getPodcasts: () => void;
  clearSelectedPodcast: () => void;
  searchPodcasts: (searchValue: string) => void;
  getTracks: (id: String) => void;
  chooseTrack: (id: String) => void;
}

export const usePodcastStore = create<PodcastStore & Actions>((set, get) => ({
  podcasts: [],
  selectedPodcast: null,
  tracks: [],
  selectedTrack: null,
  getPodcasts: async () => {
    const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
    const podcasts = await response.json();
    const fetchedPodcasts = podcasts.feed.entry as Podcast[];
    set({ podcasts: fetchedPodcasts})
  },
  getTracks: async (id: String) => {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`);
    const podcast = await response.json();
    const [firstElement, ...restOfArray] = podcast.results;
    const selectedPodcast = firstElement as PodcastDetailed
    const tracks = restOfArray as Track[];
    set({ tracks: tracks, selectedPodcast: selectedPodcast});
  },
  chooseTrack: async (id: String) => {
   const response = get().tracks;
    const selectedTrack = response.find((track: Track) => track.trackId === +id);
    set({ selectedTrack: selectedTrack });
  },
  clearSelectedPodcast: () => set({ selectedPodcast: null}),
  filteredPodcasts: null,
  searchPodcasts: (searchValue: string) => {
    const podcasts = get().podcasts;
    const filtered = podcasts.filter((podcast: Podcast) => {
      const name = podcast['im:name'].label.toLowerCase();
      const author = podcast['im:artist'].label.toLowerCase();
      return name.includes(searchValue) || author.includes(searchValue);
    });
    set({ filteredPodcasts: filtered});
  }
}))