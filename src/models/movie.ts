export interface Movie {
    id: number;
    name: string;
    cast: Array<Cast>;
  }

  export interface Cast {
    id: number;
    name: string;
    birthday: string;
  }