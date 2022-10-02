import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { Registration } from "./components/Registration/Registration";
import { Login } from "./components/Login/Login";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path={'/registration'} exact  element={<Registration/>}/>
            <Route path={'/login'} exact element={<Login/>}/>
           <Route path={'/profile'} exact element={<ProfilePage/>}/>
        </Routes>
    );
}

export default App;
