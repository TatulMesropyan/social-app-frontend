import { useState } from "react";
import axios from 'axios'
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { Registration } from "./components/Registration/Registration";

function App() {

    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const [dataComingBE, setDataComingBE] = useState([])

    const sendPostRequest = async () => {
        try {
            await axios.post(
                'http://localhost:8080/posts', {
                username: registrationData.username,
                email: registrationData.email,
                phone: registrationData.password,
                password: registrationData.password,
                confirmPassword: registrationData.confirmPassword
            }
            )
        }
        catch (err) {
            console.error(err)
        }
    };

    const getData = async () => {
        const response = await axios.get('http://localhost:8080/posts')
        setDataComingBE(response.data)
    }

    return (
        <>
            <Registration getData={getData} registrationData={registrationData} sendPostRequest={sendPostRequest} setRegistrationData={setRegistrationData} />
            <ProfilePage getData={getData} data={dataComingBE} />
        </>
    );
}

export default App;
