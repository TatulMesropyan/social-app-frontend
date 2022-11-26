import { Route, Routes } from 'react-router-dom';

import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { ChangePassword } from './components/ChangePassword/ChangePassword';

function App() {
  return (
    <Routes>
      <Route path={'/'} exact element={<Registration />} />
      <Route path={'/login'} exact element={<Login />} />
      <Route path={'/profile'} exact element={<ProfilePage />} />
      <Route path={`/profile/change-password`} exact element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
