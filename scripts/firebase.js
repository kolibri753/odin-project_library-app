import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  // update,
  // remove,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import { library } from "/scripts/script.js";
import { JSONToBook } from "/scripts/script.js";
import { updateBooksGrid } from "/scripts/script.js";

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
const db = getDatabase();

const btnSignIn = document.getElementById("sign-in-btn");
const btnSignOut = document.getElementById("sign-out-btn");
const username = document.querySelector("#sign-out-text");

auth.onAuthStateChanged((user) => {
  if (user) {
    btnSignIn.style.display = "none";
    btnSignOut.style.display = "block";
    const name = user.email;
    username.innerHTML = name.replace("@gmail.com", "");
    selectDataDB(name.replace("@gmail.com", ""));
  }
  else {
    // btnSignIn.style.display = "block";
    // btnSignOut.style.display = "none";
    username.innerHTML = "Sign In";
  }
});

btnSignIn.addEventListener("click", async (e) => {
  await signInWithPopup(auth, provider)
    // .then((result) => {
    //   const user = result.user;
    //   // btnSignIn.style.display = "none";
    //   // btnSignOut.style.display = "block";
    //   // const name = user.email;
    //   // username.innerHTML = name.replace("@gmail.com", "");
    //   // selectDataDB(name.replace("@gmail.com", ""));
    // })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

btnSignIn.addEventListener("touchstart", (e) => {
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    // .then((result) => {
    //   const user = result.user;
    //   // console.log(user);
    //   // btnSignIn.style.display = "none";
    //   // btnSignOut.style.display = "block";
    //   // const name = user.email;
    //   // username.innerHTML = name.replace("@gmail.com", "");
    //   // selectDataDB(name.replace("@gmail.com", ""));
    // })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

btnSignOut.addEventListener("click", async (e) => {
  await signOut(auth)
    .then(() => {
      btnSignIn.style.display = "block";
      btnSignOut.style.display = "none";
      username.textContent = "Sign Out";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

function insertAllDataDB(name, data) {
  set(ref(db, `Users/${name}`), data)
    // .then(()=> {
    //   alert('success');
    // })
    .catch((error) => {
      alert(error);
    });
}

function selectDataDB(name) {
  const dbref = ref(db);

  get(child(dbref, `Users/${name}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const books = snapshot.val();
        library.books = books.map((book) => JSONToBook(book));
        updateBooksGrid();
      } else {
        alert(
          "You have zero books yet!\nP.S. If you want to add new just click 'plus' on the top right corner"
        );
      }
    })
    .catch((error) => {
      alert(error);
    });
}

export { insertAllDataDB };
