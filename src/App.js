import { useState } from "react";
import axios from 'axios'

import { Registration } from "./components/Registration/Registration";

function App() {

    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    console.log(registrationData.username)

    const sendPostRequest = async () => {
        try {
            await axios.post(
                'http://localhost:8080/posts', {
                    username:registrationData.username,
                    email:registrationData.email,
                    phone:registrationData.password,
                    password:registrationData.password,
                    confirmPassword:registrationData.confirmPassword
                }
            )
        }
        catch (err) {
            console.error(err)
        }
    };

    return (
        <>
            <Registration registrationData={registrationData} sendPostRequest={sendPostRequest} setRegistrationData={setRegistrationData} />
        </>
    );
}

export default App;
