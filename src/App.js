
import {Provider} from "react-redux"
import store from "./store"
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from "./routers/AppRouter";
import Layout from "./components/layouts/Layout";

export default function App (){
    return (
      <Router>
        <Provider store={store}>
          <Layout>
            <AppRouter/>
          </Layout>
        </Provider>
      </Router>
    );
  }



