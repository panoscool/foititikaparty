import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EventPage from './components/Event/EventPage';
import EventDetailsPage from './components/Event/EventDetails/EventDetailsPage';
import EventForm from './components/Event/EventForm';
import SettingsPage from './components/User/Settings/SettingsPage';
import NotFoundPage from './components/NotFoundPage';
import ModalManager from './components/Modals/ModalManager';
import firebase from './config/firebase';
import { SIGN_IN, SIGN_OUT } from './store/actionTypes';

function App() {
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: SIGN_IN, payload: user });
    } else {
      dispatch({ type: SIGN_OUT });
    }
  });

  return (
    <Layout>
      <ModalManager />
      <Switch>
        <Route path={['/event/:id/edit', '/event/create']} component={EventForm} />
        <Route path="/event/:id" component={EventDetailsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/profile/:id" component={SettingsPage} />
        <Route path="/people" component={SettingsPage} />
        <Route exact path="/" component={EventPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

export default App;
