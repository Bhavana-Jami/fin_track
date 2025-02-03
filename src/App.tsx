import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Networth from './pages/Networth';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';
import Investments from './pages/Investments';
import "./App.css"

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/networth"
          element={
            <>
              <PageTitle title="Networth | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Networth />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Fin Track - Track and Manage Your Money" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Fin Track - Track and Manage Your Money" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Fin Track - Track and Manage Your Money" />
              <Settings />
            </>
          }
        />
        <Route
          path="/expenses"
          element={
            <>
              <PageTitle title="Expenses | Fin Track - Track and Manage Your Money" />
              <Expenses />
            </>
          }
        />
        <Route
          path="/budget"
          element={
            <>
              <PageTitle title="Budget | Fin Track - Track and Manage Your Money" />
              <Budget />
            </>
          }
        />
        <Route
          path="/investments"
          element={
            <>
              <PageTitle title="Investments | Fin Track - Track and Manage Your Money" />
              <Investments />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
