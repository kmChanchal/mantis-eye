import React, { useState } from 'react';
import Login from './Login';
import MainDashboard from './MainDashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <MainDashboard />
    </div>
  );
};

export default App;
