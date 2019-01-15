import Firebase from 'firebase';
import constants from '../constants';

const firebaseApp = () => {
  Firebase.initializeApp(constants.firebaseConfig);
};

export default firebaseApp;
