import { initializeApp } from "firebase/app";

// prettier-ignore
export default initializeApp({
  apiKey:
    process.env.FIREBASE_API_KEY ||
    process.env.STORYBOOK_FIREBASE_API_KEY ||
    process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN ||
    process.env.STORYBOOK_FIREBASE_AUTH_DOMAIN ||
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    process.env.FIREBASE_DB_URL ||
    process.env.STORYBOOK_FIREBASE_DB_URL ||
    process.env.REACT_APP_FIREBASE_DB_URL,
  projectId:
    process.env.FIREBASE_PROJECT_ID ||
    process.env.STORYBOOK_FIREBASE_PROJECT_ID ||
    process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.STORYBOOK_FIREBASE_STORAGE_BUCKET ||
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.FIREBASE_MESSAGE_SENDER_ID ||
    process.env.STORYBOOK_FIREBASE_MESSAGE_SENDER_ID ||
    process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId:
    process.env.FIREBASE_APP_ID ||
    process.env.STORYBOOK_FIREBASE_APP_ID ||
    process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:
    process.env.FIREBASE_MEASUREMENT_ID ||
    process.env.STORYBOOK_FIREBASE_MEASUREMENT_ID ||
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});
