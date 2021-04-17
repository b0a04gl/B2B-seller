import firebase from 'firebase'


 const firebaseConfig = {
   apiKey: "AIzaSyBvYnPSUaSFMPiToD82UZ7WR4U5HQDTU5A",
    authDomain: "b2b-app-df137.firebaseapp.com",
    databaseURL: "https://b2b-app-df137-default-rtdb.firebaseio.com",
    projectId: "b2b-app-df137",
    storageBucket: "b2b-app-df137.appspot.com",
    messagingSenderId: "811825316997",
    appId: "1:811825316997:web:4a1bb130244dc4dabe55ec"
 };

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
