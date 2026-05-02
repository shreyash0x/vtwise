# ☁️ Google Cloud Deployment Guide — VoteWise

This guide provides step-by-step instructions to set up the **Google Cloud Platform (GCP)** APIs and services required to power **VoteWise** with 100% functionality.

---

## 1. Create a Google Cloud Project
1.  Go to the [GCP Console](https://console.cloud.google.com/).
2.  Click the **Project Dropdown** at the top left.
3.  Select **New Project**.
4.  Enter `votewise-production` as the project name and click **Create**.
5.  Ensure your project is selected before proceeding.

---

## 2. Enable Required APIs
You must enable three specific APIs to power the AI and language features.

### A. Generative AI API (Gemini)
*Required for: AI Chat Assistant, Personalized Journey, and Timeline.*
1.  Search for **"Generative AI API"** in the top search bar.
2.  Select it and click **Enable**.
3.  Alternatively, use [Google AI Studio](https://aistudio.google.com/) to get a `GEMINI_API_KEY` for faster setup.

### B. Cloud Translation API
*Required for: Real-time translation into 22 Indian languages.*
1.  Search for **"Cloud Translation API"** in the top search bar.
2.  Select it and click **Enable**.
3.  *Note: This requires a billing account to be linked (it has a generous free tier).*

### C. Cloud Natural Language API
*Required for: Sentiment analysis and user satisfaction tracking.*
1.  Search for **"Cloud Natural Language API"** in the top search bar.
2.  Select it and click **Enable**.

---

## 3. Set Up Service Account (Security-First)
To allow your backend server to use the Translation and NLP APIs, you need a Service Account.

1.  Go to **IAM & Admin > Service Accounts**.
2.  Click **Create Service Account**.
3.  Name it `votewise-backend` and click **Create and Continue**.
4.  **Grant access (Roles):**
    *   `Cloud Translation API User`
    *   `Cloud Natural Language API User`
5.  Click **Done**.
6.  Click on the newly created service account, go to the **Keys** tab.
7.  Click **Add Key > Create New Key**.
8.  Select **JSON** and click **Create**.
9.  **Crucial:** Save this file as `service-account.json` in your `/server` folder. (It is already in `.gitignore`).

---

## 4. Firebase Setup (Authentication & Hosting)
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add Project** and select your existing GCP project (`votewise-production`).
3.  **Authentication:**
    *   Enable **Google** and **Email/Password** providers.
4.  **Project Settings:**
    *   Scroll down to **Your Apps** and click the **Web icon (`</>`)**.
    *   Register your app as `VoteWise`.
    *   Copy the `firebaseConfig` object and paste the values into your `client/.env`.

---

## 5. Deployment Options

### Backend (Google Cloud Run)
Cloud Run is perfect for the Node.js server.
```bash
cd server
# Deploy to Cloud Run (follows the Dockerfile)
gcloud run deploy votewise-api --source . --platform managed --region us-central1 --allow-unauthenticated
```
*GCP will prompt you for your environment variables. Enter your MONGODB_URI and GEMINI_API_KEY there.*

### Frontend (Firebase Hosting)
Firebase Hosting provides the best performance for the React UI.
```bash
cd client
npm run build
firebase init hosting
# Select your project, set 'dist' as public directory, and 'single page app' to Yes.
firebase deploy --only hosting
```

---

## 🛡️ Security Check
*   Ensure **no secrets** are hardcoded in the code.
*   Update `VITE_API_URL` in your production environment to point to your Cloud Run URL.
*   Whitelist your frontend URL in the MongoDB Atlas Network Access settings.

**Project Fully Renamed & Optimized — Ready for Production! 🚀**
