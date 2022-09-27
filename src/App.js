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
        console.log('Clicked')
        try {
            await axios.post(
                'http://localhost:8080/posts', registrationData.username, registrationData.email
            )
        }
        catch (err) {
            console.error(err)
        }
        // try {
        //     const { data } = await axios.post(
        //         'https://localhost.8080/posts',
        //         registrationData.username, Registration.email
        //     );

        //     const resp = await axios.post('localhost.8080/posts', {
        //         method: 'POST',
        //     });
        //     console.log(resp.data);
        // } catch (err) {
        //     // Handle Error Here
        //     console.error(err);
        // }
    };

    return (
        <>
            <Registration registrationData={registrationData} sendPostRequest={sendPostRequest} setRegistrationData={setRegistrationData} />
        </>
    );
}

export default App;
