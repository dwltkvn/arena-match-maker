//import firebase from "firebase"
import firebase from "firebase/app"
import "firebase/database"

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

const isWindow = typeof window !== "undefined" && window

if (isWindow) {
  console.log(firebaseConfig)
  firebase.initializeApp(firebaseConfig)
}

export default firebase
