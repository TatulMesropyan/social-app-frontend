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

    const sendPostRequest = async () => {
        try {
            const resp = await axios.post('localhost.6006/posts', {
                username: registrationData.username,
                email: registrationData.email,
                phone: registrationData.phone,
                password: registrationData.password,
                confirmPassword: registrationData.confirmPassword
            });
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    return (
        <>
            <Registration registrationData={registrationData} sendPostRequest={sendPostRequest} setRegistrationData={setRegistrationData} />
        </>
    );
}

export default App;
