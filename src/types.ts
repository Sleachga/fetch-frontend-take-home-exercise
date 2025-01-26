export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => Promise<{ success: boolean }>;
  logout: () => void;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LocationResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface Bounds {
  top_right: Coordinates;
  bottom_left: Coordinates;
}
