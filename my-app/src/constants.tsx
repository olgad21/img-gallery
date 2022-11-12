export interface User {
  name: string;
  email: string;
  birthday: Date;
  country: string;
  agreedToPrivacyRules: boolean;
  agreedToEmails: boolean;
  gender: "male" | "female";
  img: File | null;
}

export const users: User[] = [
  {
    name: "Bret",
    email: "Shanna@melissa.tv",
    birthday: new Date("2001-10-10"),
    country: "USA",
    agreedToPrivacyRules: true,
    agreedToEmails: false,
    gender: "male",
    img: null,
  },
  {
    name: "Antonette",
    email: "Nathan@yesenia.net",
    birthday: new Date("1996-10-10"),
    country: "Russia",
    agreedToPrivacyRules: true,
    agreedToEmails: true,
    gender: "female",
    img: null,
  },
];

const monsters = [
  {
    id: "1",
    name: "Bret",
    website: "hildegard.org",
    email: "Shanna@melissa.tv",
    username: "Leanne",
  },
  {
    id: "2",
    name: "Antonette",
    website: "anastasia.net",
    email: "Nathan@yesenia.net",
    username: "McKenziehaven",
  },
];

const photos = [
  {
    id: "52425432016",
    owner: "181776069@N02",
    title: "Margo",
    secret: "3408aefc14",
    server: "65535",
    farm: "66",
  },
  {
    id: "52425889655",
    owner: "48110669@N05",
    title: "Chelsea Market",
    secret: "d236070f4f",
    server: "65535",
    farm: "66",
  },
];

export const responsePhotos = [
  {
    page: 1,
    pages: 1,
    perpage: 2,
    total: 2,
    photo: photos,
  },
];

export const flickrResponse = {
  stat: "OK",
  photos: responsePhotos,
};

export const host =
  "https://www.flickr.com/services/rest/?method=flickr.photos.search";

export const apiKey = "9e74150fed9ef4748d739ad4f107079c";

export const sortOptions = [
  {
    label: "Date posted (New to Old)",
    value: "date-posted-desc",
  },
  {
    label: "Date posted (Old to New)",
    value: "date-posted-asc",
  },
  {
    label: "Most Interesting",
    value: "interestingness-desc",
  },
];

export const onPageOptions = [
  {
    label: "Results per page",
    value: 100,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 50,
    value: 50,
  },
  {
    label: 100,
    value: 100,
  },
  {
    label: 250,
    value: 250,
  },
];

export const pagesCountOptions = [
  {
    label: "Total number of pages",
    value: 1,
  },
  {
    label: 1,
    value: 1,
  },
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
];

export default monsters;
