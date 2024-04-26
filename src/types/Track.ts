export default interface Track {
  countrty: string;
  previewUrl: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  shortDescription: string;
  trackId: number;
  trackName: string;
  episodeUrl: string;
  feedUrl: string;
  artistIds: number[];
  genres: {name: string, id: string}[];
  episodeGuid: string;
  description: string;
  releaseDate: string;
  contentAdvisoryRating: string;
  trackViewUrl: string;
  artworkUrl60: string;
  artistViewUrl: string;
  artworkUrl600: string;
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  kind: string;
  wrapperType: string;
}