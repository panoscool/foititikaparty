import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EventPage from './components/Event/EventPage';
import EventCreate from './components/Event/EventCreate';
import EventEdit from './components/Event/EventEdit';
import EventDetailsPage from './components/Event/EventDetails/EventDetailsPage';
import PhotosPage from './components/Photos/PhotosPage';
import SettingsPage from './components/Settings/SettingsPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/people" component={PhotosPage} />
        <Route path="/profile/:id" component={PhotosPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/event/create" component={EventCreate} />
        <Route path="/event/:id/edit" component={EventEdit} />
        <Route path="/event/:id" component={EventDetailsPage} />
        <Route path="/" component={EventPage} />
      </Switch>
    </Layout>
  );
}

export default App;
