import { Route, Routes } from 'react-router-dom';
//import Homepage from './component/Homepage';
import Guestsignup from '../components/signupGuest';
import Login from '../components/Login'
import RootDashboard from '../components/RootDashboard';
import GuestDashboard from '../components/GuestDashboard';
import {RPrivateRoute, GPrivateRoute, PrivateRoute} from '../routers/PrivateRoute'
import ListBecas from '../components/becas/ListBecas';
import PublicRoute from './PublicRoute';
import NotFoundPage from '../components/PageNotFound';
import AccountPage from '../components/pages/AccountPage/AccountPage';


export default function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<ListBecas/>}/>
      <Route exact path="/guest/register/" element={<PublicRoute><Guestsignup/></PublicRoute>}/>
      <Route exact path="/guest/login/" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route exact path="/guest/dashboard/"  element={<GPrivateRoute><GuestDashboard/></GPrivateRoute>} />
      <Route exact path="/root/dashboard/"  element={<RPrivateRoute><RootDashboard/></RPrivateRoute>}/>
      <Route exact path="/user/profile"  element={<PrivateRoute><AccountPage/></PrivateRoute>}/>     
      <Route path="*" element={<NotFoundPage/>}></Route>
    </Routes>
  )
}
