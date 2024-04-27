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
  selectedTrack: Track | null;
  loading?: boolean;
}

type Actions = {
  getPodcasts: () => void;
  clearSelectedPodcast: () => void;
  searchPodcasts: (searchValue: string) => void;
  getTracks: (id: String, episodeId: String | null) => void;
  chooseTrack: (id: String) => void;
  clearSelectedTrack: () => void;
}

export const usePodcastStore = create<PodcastStore & Actions>((set, get) => ({
  podcasts: [],
  selectedPodcast: null,
  tracks: [],
  selectedTrack: null,
  filteredPodcasts: null,
  loading: false,
  getPodcasts: async () => {
    set({ loading: true });
    try {
      const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      const podcasts = await response.json();
      const fetchedPodcasts = podcasts.feed.entry as Podcast[];
      set({ podcasts: fetchedPodcasts });
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      set({ loading: false });
    }
  },
  getTracks: async (id: String, episodeId: String | null) => {
    set({ loading: true });
    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`);
      const podcast = await response.json();
      const [firstElement, ...restOfArray] = podcast.results;
      const selectedPodcast = firstElement as PodcastDetailed;
      const tracks = restOfArray as Track[];

      if (episodeId) {
        const selectedTrack = tracks.find((track: Track) => track.trackId === +episodeId);
        set({ selectedTrack, loading: false });
      }
      set({ tracks, selectedPodcast });
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      set({ loading: false });
    }
  },
  chooseTrack: async (id: String) => {
    try {
      const response = get().tracks;
      const selectedTrack = response.find((track: Track) => track.trackId === +id);
      set({ selectedTrack });
    } catch (error) {
      console.error('Error choosing track:', error);
    }
  },
  clearSelectedPodcast: () => {
    console.log('clearing selected podcast');
    set({ selectedPodcast: null, tracks: [], selectedTrack: null });
  },
  clearSelectedTrack: () => {
    console.log('clearing selected track');
    set({ selectedTrack: null });
  },
  searchPodcasts: (searchValue: string) => {
    const podcasts = get().podcasts;
    const filtered = podcasts.filter((podcast: Podcast) => {
      const name = podcast['im:name'].label.toLowerCase();
      const author = podcast['im:artist'].label.toLowerCase();
      return name.includes(searchValue) || author.includes(searchValue);
    });
    set({ filteredPodcasts: filtered });
  }
}))