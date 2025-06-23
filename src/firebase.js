import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

const firebaseConfig = {
    databaseURL: 'https://imd0404-web-i-jota-mlc-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);