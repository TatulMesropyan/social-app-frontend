import {useState} from "react";
import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { Registration } from "./components/Registration/Registration";
import { Login } from "./components/Login/Login";

function App() {
    const [user,setUser] = useState({})
    return (
        <Routes>
            <Route path={'/'} exact element={<Registration />} />
            <Route path={'/login'} exact element={<Login saveUserData={setUser} />} />
            <Route path={'/profile'} exact element={<ProfilePage user={user}/>} />
        </Routes>
    );
}

export default App;
