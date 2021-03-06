export interface Status {
  loading: boolean;
  error: string | null;
}

export interface Configuration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: Array<string>;
    logo_sizes: Array<string>;
    poster_sizes: Array<string>;
    profile_sizes: Array<string>;
    still_sizes: Array<string>;
  };
  change_keys: Array<string>;
}

export interface Movie {
  id: number;
  imdb_id: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  production_companies: Array<Company> | null;
  videos: { results: Array<Video> };
  genres: Array<Genres>;
  credits: Credits;
  character?: string;
  department?: string;
  job?: string;
  original_title?: string;
}

export interface Show {
  id: number;
  poster_path: string;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  homepage: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  seasons: Array<Season> | null;
  vote_average: number;
  videos: { results: Array<Video> };
  genres: Array<Genres>;
  credits: Credits;
}

export interface Credits {
  cast: [CreditCast];
  crew: [CreditCrew];
}

export interface CreditCast extends Person {
  id: number;
  character: string;
  name: string;
  profile_path: string;
}

export interface CreditCrew extends Person {
  id: number;
  department: string;
  name: string;
  profile_path: string;
}

export interface Genres {
  id: number;
  name: string;
}

export interface Season {
  id: number;
  air_date: string;
  name: string;
  poster_path: string;
  overview: string | null;
  season_number: number | null;
  episodes: Array<Episode> | null;
}

export interface Episode {
  id: number;
  air_date?: string;
  name?: string;
  overview?: string;
  episode_number: number;
  season_number: number;
  vote_average?: number;
}

export interface Company {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Video {
  id: string;
  iso_639_1: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Person {
  id: number;
  name: string;
  imdb_id: string | null;
  also_known_as: Array<string>;
  biography: string | null;
  profile_path: string | null;
  birthday: string | null;
  deathday: string | null;
  cast: Array<Cast> | null;
  crew: Array<Crew> | null;
  character: string | undefined;
  department: string | undefined;
  movie_credits: PersonCredits | null;
  tv_credits: PersonCredits | null;
}

export interface PersonCredits {
  cast: Array<Cast> | null;
  crew: Array<Crew> | null;
}

export interface Cast {
  id: number;
  character?: string;
  title?: string;
  name?: string;
  poster_path?: string;
}

export interface Crew {
  id: number;
  department?: string;
  job?: string;
  original_title?: string;
  original_name?: string;
  poster_path?: string;
}
