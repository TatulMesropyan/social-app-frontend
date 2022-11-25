import { Route, Routes } from 'react-router-dom';

import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';

function App() {
  return (
    <Routes>
      <Route path={'/'} exact element={<Registration />} />
      <Route path={'/login'} exact element={<Login />} />
      <Route path={'/profile'} exact element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
