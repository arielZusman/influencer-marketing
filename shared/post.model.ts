export type PostResult = {
  items: Item[];
  more_available: boolean;
  end_cursor: string;
  status: string;
};

export type Item = {
  pk: number;
  display_url: string;
  image_versions2: ImageVersions2;
  has_audio: boolean;
  is_dash_eligible: string;
  video_dash_manifest: string;
  number_of_qualities: number;
  video_url: string;
  taken_at: number;
  code: string;
  comment_count: number;
  like_count: number;
  view_count: number;
  play_count: number;
  like_and_view_counts_disabled: boolean;
  media_type: number;
  video_duration: number;
  caption: Caption;
  title: string;
  user: User;
  coauthor_producers: CoauthorProducer[];
  location: Location;
  product_type: string;
  can_viewer_reshare: boolean;
  usertags: Usertags;
  sponsor_tags: SponsorTag[];
  carousel_media_count: number;
  carousel_media: CarouselMedia[];
  clips_metadata: ClipsMetadata;
};

export type Caption = {
  text: string;
};

export type CarouselMedia = {
  pk: number;
  display_url: string;
  image_versions2: ImageVersions2;
  has_audio: boolean;
  is_dash_eligible: string;
  video_dash_manifest: string;
  number_of_qualities: number;
  video_url: string;
};

export type ImageVersions2 = {
  candidates: Candidate[];
};

export type Candidate = {
  width: number;
  height: number;
  url: string;
};

export type ClipsMetadata = {
  music_info: MusicInfo;
};

export type MusicInfo = {
  music_asset_info: MusicAssetInfo;
};

export type MusicAssetInfo = {
  audio_cluster_id: string;
  id: string;
  title: string;
  subtitle: string;
  display_artist: string;
};

export type CoauthorProducer = {
  pk: number;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
};

export type Location = {
  pk: number;
  name: string;
  lng: number;
  lat: number;
  address: string;
  city: string;
};

export type SponsorTag = {
  sponsor: User;
};

export type User = {
  pk: number;
  username: string;
  full_name: string;
  profile_pic_url: string;
  is_private: boolean;
  is_verified: boolean;
};

export type Usertags = {
  in: In[];
};

export type In = {
  user: User;
  position: number[];
};

export type PostResponse = {
  items: ItemResponse[];
  more_available: boolean;
  end_cursor: string;
  status: string;
};

export type ItemResponse = {
  display_url: string;
  code: string;
  comment_count: number;
  like_count: number;
  media_type: MediaType;
};

export type MediaType = "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";