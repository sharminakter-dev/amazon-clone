import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    FacebookAuthProvider, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword,
    sendEmailVerification,  
    sendPasswordResetEmail} from "firebase/auth";

// Initialize Firebase
const initializeLoginFramework = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(initializeLoginFramework);

 // handleGoogleSignIn
export const handleGoogleSignIn=()=>{
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
    .then((result) => {
        const {displayName, email, photoURL} = result.user;
    //   console.log(result.user);
        const signedInUser ={
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL,
            success:true
        };
        return signedInUser;
    }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

// handleFbsignIn
export const handleFbsignIn = ()=>{
    const fbProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, fbProvider)
    .then((result) => {
        // The signed-in user info.
        const {displayName, email, photoURL} = result.user;
        // console.log(result.user)
        // console.log(photoURL)
        const user = {
            isSignedIn:true,
            name:displayName,
            email:email, 
            photo:photoURL,
            success:true
        };
        return user;
    })
    .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
    });

}


// handleSignout
export const handleSignout = ()=>{
    return signOut(auth).then(() => {
        const signedOutUser = {
            isSignedIn:false,
            name:'',
            email:'',
            password:'',
            photo:'',
            error:'',
            success:false
        }
        return signedOutUser;
        // setUser(user)
        }).catch((error) => {
        // An error happened.
        });
}


export const createWithEmailAndPassword= (name, email, password)=>{ 
    // console.log(name);
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        // console.log(userCredential.user);
        const newUserInfo = userCredential.user;
        newUserInfo.success = true;
        newUserInfo.isSignedIn = true;
        newUserInfo.newUser = false;
        newUserInfo.name = name;
        updateUserName(name);
        verifyEmail();
        return newUserInfo
    })
    .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        const newUserInfo = {};
        newUserInfo.isSignedIn = false;
        newUserInfo.newUser = true;
        newUserInfo.success = false;
        newUserInfo.error = errorMessage;
        return newUserInfo;
    });
    }


export const signInUserWithEmailAndPassword = ( email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const newUserInfo = userCredential.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        newUserInfo.isSignedIn = true;
        newUserInfo.newUser = false;
        return newUserInfo;
    })
    .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.isSignedIn = false;
        newUserInfo.success = false;
        newUserInfo.error = errorMessage;
        return newUserInfo;
    });
}


const updateUserName = (name)=>{
    // console.log(name);
    updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
       console.log('user name updated successfully');
      }).catch((error) => {
       console.log(error);
      });
}

// verify Email
const verifyEmail = () =>{
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
}

// reset password
export const resetPassword = (email) =>{
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode , errorMessage);
  });
}