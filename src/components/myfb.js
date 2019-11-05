import firebase from "firebase"

var firebaseConfig = {
  apiKey: process.env.GATSBY_fb_apiKey,
  authDomain: process.env.GATSBY_fb_authDomain,
  databaseURL: process.env.GATSBY_fb_databaseURL,
  projectId: process.env.GATSBY_fb_projectId,
  storageBucket: process.env.GATSBY_fb_storageBucket,
  messagingSenderId: process.env.GATSBY_fb_messagingSenderId,
  appId: process.env.GATSBY_fb_appId,
  measurementId: process.env.GATSBY_fb_measurementId,
}

console.log(firebaseConfig)
firebase.initializeApp(firebaseConfig)
export default firebase
