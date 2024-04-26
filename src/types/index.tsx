export type params = {
  tag?: string;
  id: string;
};

export type IResult = {
  error: string | any;
  loading: Boolean;
  data: String[];
};

export type ISearchWithImage = {
  keyword: string;
  files: any;
};

export type FileUploaderProps = {
  onUploadComplete: (files: any) => void;
  fileTypes: string[];
  className: string;
};

export type imageParts = {
  inlineData: {
    data: unknown;
    mimeType: any;
  };
}[];



interface Photo {
     id: number;
     width: number;
     height: number;
     url: string;
     photographer: string;
     photographer_url: string;
     photographer_id: number;
     avg_color: string;
     src: {
         original: string;
         large2x: string;
         large: string;
         medium: string;
         small: string;
         portrait: string;
         landscape: string;
         tiny: string;
     };
     liked: boolean;
     alt: string;
 }
 
 export interface PhotoData {
     page: number;
     per_page: number;
     total_results:number;
     photos: Photo[];
 }
 

 export interface IPhoto {
     photo:Photo
 }