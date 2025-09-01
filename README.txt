# Firebase Hosting Starter (CPA Reviewer)
This folder is ready to deploy to Firebase Hosting and already includes your lecture files:
- TCP_IVA_Nontaxable_Dispositions_Reviewer.html
- TCP_IV_Gains_Losses_Netting_Reviewer.html
- TCP_IVC_Related_Parties_Imputed_Interest_Reviewer.html

## Quick start

1. Install Node.js (LTS) from https://nodejs.org
2. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
3. Login:
   ```bash
   firebase login
   ```
4. Initialize Hosting in this folder (pick your Firebase project; public dir = `public`):
   ```bash
   firebase init hosting
   ```
   *(If you already see firebase.json, you can just press Enter to accept defaults.)*

5. Test locally:
   ```bash
   firebase emulators:start --only hosting
   ```
   Open the local URL (usually http://localhost:5000).

6. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

## Adding more lectures

- Drop new `.html` files into the `public/` folder.
- Open `public/index.html` and add them to the `lectures` list, e.g.:
  ```js
  {
    title: "TCP II.D — Trusts",
    file: "TCP_IID_Trusts_Reviewer.html"
  }
  ```
- Re-deploy:
  ```bash
  firebase deploy --only hosting
  ```

## Optional: Custom domain

In the Firebase Console → Hosting → "Add custom domain", follow the steps to add your own domain.
