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

export const host = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';

export const apiKey = '9e74150fed9ef4748d739ad4f107079c';

export default monsters;
