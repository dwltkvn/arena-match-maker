import firebase from "firebase"

var firebaseConfig = {
  apiKey: process.env.fb_apiKey,
  authDomain: process.env.fb_authDomain,
  databaseURL: process.env.fb_databaseURL,
  projectId: process.env.fb_projectId,
  storageBucket: process.env.fb_storageBucket,
  messagingSenderId: process.env.fb_messagingSenderId,
  appId: process.env.fb_appId,
  measurementId: process.env.fb_measurementId,
}

firebase.initializeApp(firebaseConfig)
export default firebase
