import React, { useEffect, useState } from 'react';
import SurveyComponent from './SurveyComponent';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Signin from './SignIn';
import HomePage from './HomePage';
import Results from './Results';
import Journaling from './Journaling';
import UrgentResources from './UrgentResources';
import Therapy from './Therapy';
import Community from './Community';
import SelfCare from './SelfCare';
import Resources from './Resources';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function App(props) {
    const nullUser = {userId:null, userName:null}
    const [currentUser, setCurrentUser] = useState(nullUser);
    const navigateTo = useNavigate();

    useEffect(() => {

        //note: code for authentification was from INFO 340 Lecture Demo by Joel Ross 

        const auth = getAuth();

        //listens to changes in the user Id and state of authentification to determine if someone logged in 
        onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) { 
                console.log("authentification state changed");
                console.log(firebaseUser);
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
            }
            else { //not defined, so logged out
                setCurrentUser(nullUser);
            }
        });

    }, [])

        const loginUser = (userObject) => {
            setCurrentUser(userObject);
            navigateTo('/');
        }

        function ProtectedPage(props) {
            if(!props.currentUser.uid) {
                return <Navigate to="/SignIn" />
            }
        }

    return (
        //routing
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/quiz" element={<SurveyComponent />} />
            <Route path="/results" element={<Results />} />
            <Route path="/journaling" element={<Journaling />} />
            <Route path="/urgentresources" element={<UrgentResources />} />
            <Route path="/nonurgenthelp" element={<Therapy />} />
            <Route path="/community" element={<Community />} />
            <Route path="/selfcare" element={<SelfCare />} />
            <Route path="/resources" element={<Resources />} />
        </Routes> 
    );
}

export default App;
