const firebaseConfig = {
    apiKey: "AIzaSyBKidAdz1yBHnLe7gMf_OASpz6BeXktwtU",
    authDomain: "weather-project-62c37.firebaseapp.com",
    projectId: "weather-project-62c37",
    storageBucket: "weather-project-62c37.appspot.com",
    messagingSenderId: "315784873589",
    appId: "1:315784873589:web:e9375d563a510369c49a3c"
  };

export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return firebaseConfig;
    }
}    