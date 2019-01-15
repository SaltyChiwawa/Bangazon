import Firebase from 'firebase';

const registerUser = (user) => {
    return Firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
    return Firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

const logoutUser = () => {
    return Firebase.auth().signOut();
};

const getUid = () => {
    return Firebase.auth().currentUser.uid;
};

export default { getUid, loginUser, logoutUser, registerUser };
