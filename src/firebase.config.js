import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfzs1OKpf2rpy3zsTx-jAgrFiFwVrRnmU',
  authDomain: 'restaurant-app-e0343.firebaseapp.com',
  databaseURL: 'https://restaurant-app-e0343-default-rtdb.firebaseio.com',
  projectId: 'restaurant-app-e0343',
  storageBucket: 'restaurant-app-e0343.appspot.com',
  messagingSenderId: '163922326774',
  appId: '1:163922326774:web:358ae647c1a7eb377568d7',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
