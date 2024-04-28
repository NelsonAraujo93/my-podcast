import Podcast from '@/types/Podcast';
import PodcastDetailed from '@/types/PodcastDetailed';
import Track from '@/types/Track';
import { get } from 'http'
import { create } from 'zustand'
const api = process.env.NODE_ENV === 'production' ? 'https://podcast-app.vercel.app/api' : 'http://localhost:3000/api';

type PodcastStore = {
  podcasts: Podcast[];
  selectedPodcast: Podcast | null;
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
  selectPodcast: (podcast: Podcast) => void;
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
      const response = await fetch(`${api}/podcasts`);
      const podcasts = await response.json();
      const fetchedPodcasts = podcasts as Podcast[];
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
      const response = await fetch(`${api}/episodes?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      
      const tracks = await response.json();
      const [firstElement, ...rest] = tracks as Track[];
      const filteredTracks = rest;
      let selectedPodcast = get().selectedPodcast;
      if (!selectedPodcast) {
        let selectedPodcastFetch = await fetch(`${api}/podcasts/${id}`);
        selectedPodcast = await selectedPodcastFetch.json();
      }

      if (episodeId) {
        const selectedTrack = filteredTracks.find((track: Track) => track.trackId === +episodeId);
        if (selectedTrack) {
          set({ selectedTrack: selectedTrack, selectedPodcast: selectedPodcast , loading: false });
        } else {
          console.error('Selected track not found');
        }
      }
      
      set({ tracks: filteredTracks, selectedPodcast: selectedPodcast, loading: false });
    } catch (error) {
      console.error('Error fetching tracks:', error);
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
  },
  selectPodcast: (podcast: Podcast) => {
    set({ selectedPodcast: podcast });
  }
}))