import React from 'react';
import Layout from './components/Layout/Layout';
import EventPage from './components/Event/EventDashboard/EventPage';

const App: React.FC = () => {
  return (
    <Layout>
      <EventPage />
    </Layout>
  );
}

export default App;
