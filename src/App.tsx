import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import EventPage from './components/Event/EventPage';
import EventDetailsPage from './components/Event/EventDetails/EventDetailsPage';
import ManageEvent from './components/Event/ManageEvent'
import PhotosPage from './components/Photos/PhotosPage';
import SettingsPage from './components/Settings/SettingsPage';
import ModalManager from './components/Modals/ModalManager';

function App() {
  const { key } = useLocation();

  return (
    <Layout>
      <ModalManager />
      <Switch key={key}>
        <Route path="/settings" component={SettingsPage} />
        <Route path="/profile/:id" component={PhotosPage} />
        <Route path="/people" component={PhotosPage} />
        <Route path={["/event/create", "/event/:id/edit"]} component={ManageEvent} />
        <Route path="/event/:id" component={EventDetailsPage} />
        <Route path="/" component={EventPage} />
      </Switch>
    </Layout>
  );
}

export default App;
