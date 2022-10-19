interface Photo {
  id: string;
  owner: string;
  title: string;
  secret: string;
  server: string;
  farm: string;
}

export interface FlickrResponse {
  stat: string;
  photos: ResponsePhotos;
}

interface ResponsePhotos {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
}

export default Photo;
