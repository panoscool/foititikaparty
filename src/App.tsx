import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import EventPage from './components/Event/EventPage';
import EventForm from './components/Event/EventForm';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/event/create" component={EventForm} />
        <Route path="/" component={EventPage} />
      </Switch>
    </Layout>
  );
}

export default App;
