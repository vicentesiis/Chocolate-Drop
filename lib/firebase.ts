import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Environment-specific Firebase configurations
const developmentConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

const productionConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

// Select configuration based on environment
const firebaseConfig =
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig;

// Validate that required environment variables are present
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required Firebase environment variables: ${missingEnvVars.join(", ")}\n` +
      `Current environment: ${process.env.NODE_ENV || "development"}`,
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Export current environment info for debugging
export const firebaseEnv = {
  environment: process.env.NODE_ENV || "development",
  projectId: firebaseConfig.projectId,
};
