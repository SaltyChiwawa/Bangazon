import Firebase from 'firebase';
import constants from '../Constants';

const firebaseApp = () => {
  Firebase.initializeApp(constants.firebaseConfig);
};

export default firebaseApp;
