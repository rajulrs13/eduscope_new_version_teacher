import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyDiZSGzMYlyNCjMu6-ehisyxTCR_v5_s-U",
    authDomain: "eduscopev2.firebaseapp.com",
    databaseURL: "https://eduscopev2.firebaseio.com",
    projectId: "eduscopev2",
    storageBucket: "eduscopev2.appspot.com",
    messagingSenderId: "1098810536328"
})

export default firebase