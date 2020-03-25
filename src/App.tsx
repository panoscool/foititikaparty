// @ts-nocheck
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EventPage from './components/Event/EventPage';
import EventDetailsPage from './components/Event/EventDetails/EventDetailsPage';
import EventForm from './components/Event/EventForm';
import SettingsPage from './components/User/Settings/SettingsPage';
import NotFoundPage from './components/NotFoundPage';
import ModalManager from './components/ModalManager';
import { AuthContext } from './context/AuthContext';
import firebase from './config/firebase';
import UserProfilePage from './components/User/UserProfilePage';

function App() {
  const { setUserId, setProviderId, setAuthenticated } = useContext(
    AuthContext
  );
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUserId(user.uid);
      setAuthenticated(true);
      setProviderId(user.providerData[0].providerId);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <Layout>
      <ModalManager />
      <Switch>
        <Route path={['/event/:id/edit', '/event/create']} component={EventForm} />
        <Route path="/event/:id" component={EventDetailsPage} />
        <Route path="/profile/:id" component={UserProfilePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/people" component={SettingsPage} />
        <Route exact path="/" component={EventPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

export default App;
