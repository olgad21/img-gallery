export interface User {
  name: string,
  email: string,
  birthday: Date,
  country: string,
  agreedToPrivacyRules: boolean,
  agreedToEmails: boolean,
  gender: 'male' | 'female',
  img: string,
}

export const users: User[] = [
  {
    name: "Bret",
    email: "Shanna@melissa.tv",
    birthday: new Date('2001-10-10'),
    country: 'USA',
    agreedToPrivacyRules: true,
    agreedToEmails: false,
    gender: 'male',
    img: '',
  },
  {
    name: "Antonette",
    email: "Nathan@yesenia.net",
    birthday: new Date('1996-10-10'),
    country: 'Russia',
    agreedToPrivacyRules: true,
    agreedToEmails: true,
    gender: 'female',
    img: '',
  }
]

const monsters = [{
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
},]

export default monsters;