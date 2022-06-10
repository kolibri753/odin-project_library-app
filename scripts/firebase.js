
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  // signInWithRedirect,
  // getRedirectResult,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCR_6ktywkNnqi77wvd85D7u4nkt2gRpTI",
  authDomain: "odin-project--library-app.firebaseapp.com",
  projectId: "odin-project--library-app",
  storageBucket: "odin-project--library-app.appspot.com",
  messagingSenderId: "657865767867",
  appId: "1:657865767867:web:7d5d97324cf915c5a6e29e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

const btnSignIn = document.getElementById("sign-in-btn");
const btnSignOut = document.getElementById("sign-out-btn");
// const username = document.querySelector("btn-text");
const username = document.querySelector("#sign-out-text");

btnSignIn.addEventListener("click", async (e) => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      btnSignIn.style.display = "none";
      btnSignOut.style.display = "block";
      username.innerHTML = user.displayName;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
});

btnSignOut.addEventListener("click", async (e) => {
  await signOut(auth)
    .then(() => {
      btnSignIn.style.display = "block";
      btnSignOut.style.display = "none";
      // username.innerHTML = user.displayName;
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
