export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: Track;
  restrictions: Restriction;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
}

export interface Album {
  album_type: 'compilation';
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'day' | 'month' | 'year';
  restrictions: Restriction;
  type: 'album';
  uri: string;
  album_group: 'compilation';
  artists: Artist[];
  tracks: List<Track>;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: Gerne[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Restriction {
  rease: 'market' | 'product' | 'explicit';
}

export type ItemType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'track'
  | 'show'
  | 'episode';

export interface List<T> {
  href: string;
  next: string;
  previous: string;
  limit: number;
  offset: number;
  total: number;
  items: T[];
}

export interface PlaylistTrack {
  added_at: string;
  added_by: User;
  is_local: boolean;
  primary_color: string | null;
  track: Track;
  video_thumbnail: { url: string | null };
}

export interface Playlist {
  collaborative: true;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User;
  public: true;
  snapshot_id: string;
  tracks: List<PlaylistTrack>;
  type: string;
  uri: string;
}

export interface Show {}

export interface Episode {}

export interface User {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  type: 'user';
  uri: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
  href: string;
  icons: Image[];
}

export type Gerne = string;

// 'Prog rock' | 'Grunge';

export type RepeatState = 'track' | 'context' | 'off'; // 单曲循环， 列表循环， 不循环

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}

export type SpotifySerchType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'track'
  | 'show'
  | 'episode';

export type SpotifySerchResultKey =
  | 'albums'
  | 'artists'
  | 'playlists'
  | 'tracks'
  | 'shows'
  | 'episodes';

export interface SearchResult {
  albums: List<Album>;
  artists: List<Artist>;
  playlists: List<Playlist>;
  tracks: List<Track>;
  shows: List<Show>;
  episodes: List<Episode>;
}

export interface SearchResultReponse {
  album?: SearchResponseItem<Album>;
  artist?: SearchResponseItem<Artist>;
  playlist?: SearchResponseItem<Playlist>;
  track?: SearchResponseItem<Track>;
  show?: SearchResponseItem<Show>;
  episode?: SearchResponseItem<Episode>;
}

interface SearchResponseItem<T> {
  type: SpotifySerchType;
  list: T[];
}

export interface PlayState {
  context: { uri: string; metadata: any };
  disallows: { skipping_prev: boolean; pausing: boolean };
  duration: number;
  loading: boolean;
  paused: boolean;
  playback_features: { hifi_status: string; change_playback_speed: boolean };
  playback_quality: string;
  playback_speed: number;
  position: number;
  repeat_mode: number;
  shuffle: false;
  timestamp: number;
  track_window: {
    current_track: Track;
    next_tracks: Track[];
    previous_tracks: Track[];
  };
}

export interface SavedAlbum {
  added_at: string;
  album: Album;
}
