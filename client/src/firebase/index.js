import firebase from 'firebase/app'
import 'firebase/storage'



var firebaseConfig = {
  apiKey: "AIzaSyC1_5j5SZCoUZN0NLkyemHT2ywMkTX9tB0",
  authDomain: "sp-react-image.firebaseapp.com",
  databaseURL: "https://sp-react-image.firebaseio.com",
  projectId: "sp-react-image",
  storageBucket: "sp-react-image.appspot.com",
  messagingSenderId: "271647321945",
  appId: "1:271647321945:web:0241a207427b3cec726648",
  measurementId: "G-0PH1R9ZWQ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export {
  storage, firebase as default
}