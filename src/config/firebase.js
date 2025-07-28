import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const demoDatabase = {
  chats: {},
  orders: {},
  users: {}
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export const demoDB = {
  ref: (path) => ({
    push: async (data) => {
      const id = Date.now().toString();
      const pathParts = path.split('/');
      let current = demoDatabase;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = current[pathParts[pathParts.length - 1]] || {};
      current[pathParts[pathParts.length - 1]][id] = {
        ...data,
        timestamp: Date.now()
      };
      
      return { key: id };
    },
    
    onValue: (callback) => {
      const pathParts = path.split('/');
      let current = demoDatabase;
      
      for (const part of pathParts) {
        if (current && current[part]) {
          current = current[part];
        } else {
          current = null;
          break;
        }
      }
      
      callback({
        val: () => current
      });
      
      return () => {}; 
    }
  })
};

export default app;