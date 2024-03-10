import React, { useState, useEffect } from 'react';
import Login from './Login'; // Import the Login component

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState({});
  
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  // Function to fetch users for the selected tab
  const fetchusers = async (tab) => {
    try {
      // Fetch users from the API based on the selected tab
      const response = await fetch(`https://dummyapi.online/api/users${tab}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(`Error fetching users for tab ${tab}:`, error);
    }
  };

  // Function to fetch users data
  const fetchUsersData = async () => {
    try {
      const response = await fetch('https://dummyapi.online/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchusers(tab);
    fetchUsersData(); // Fetch users data when changing tabs
  };

  // Handle sorting
  const handleSort = (criteria) => {
    if (sortBy.criteria === criteria) {
      // Toggle sorting direction if the same criteria is clicked again
      setSortBy({ criteria, order: sortBy.order === 'asc' ? 'desc' : 'asc' });
    } else {
      // Set sorting criteria and default sorting order to ascending
      setSortBy({ criteria, order: 'asc' });
    }
  };

  // Sort users based on the sorting criteria and order
  const sortedusers = [...users].sort((a, b) => {
    const valueA = a[sortBy.criteria];
    const valueB = b[sortBy.criteria];

    // Handle sorting for string values
    if (typeof valueA === 'string') {
      return sortBy.order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    // Handle sorting for numeric values
    return sortBy.order === 'asc' ? valueA - valueB : valueB - valueA;
  });

  // Effect to check login status on component mount
  useEffect(() => {
    // Here, you can check if the user is logged in based on your application's logic
    // For demonstration, I'm setting the login status to true after 2 seconds
    const loginTimer = setTimeout(() => {
      setLoggedIn(true);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(loginTimer);
  }, []);


  // Inline CSS styles for table headers
  const thStyle = {
    cursor: 'pointer',
    borderBottom: '2px solid #ccc',
    padding: '10px',
  };

  // Render the main dashboard or the login component based on the login status
  return (
    <div>
      {loggedIn ? (
        <div>
          <div>
            {/* Buttons to switch between tabs */}
            <div style={{ textAlign: 'center' }}>
  {/* Button to switch to Database 1 */}
  <button style={{ 
    backgroundColor: '#4CAF50', // Example CSS property
    border: 'none', // Example CSS property
    color: 'white', // Example CSS property
    padding: '15px 32px', // Example CSS property
    textAlign: 'center', // Example CSS property
    textDecoration: 'none', // Example CSS property
    display: 'inline-block', // Example CSS property
    fontSize: '16px', // Example CSS property
    margin: '4px 2px', // Example CSS property
    cursor: 'pointer', // Example CSS property
    borderRadius: '12px', // Example CSS property
    width: '200px', // Example CSS property
    margin: '0 auto' // Horizontally center the button
  }} onClick={() => handleTabChange(1)}>Database 1</button>
</div>

            
          </div>
          <div>
            {/* Table to display users */}
            {sortedusers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    {/* Table headers for sorting */}
                    <th style={thStyle} onClick={() => handleSort('name')}>Name</th>
              <th style={thStyle} onClick={() => handleSort('email')}>Email</th>
              <th style={thStyle} onClick={() => handleSort('id')}>ID</th>
              <th style={thStyle} onClick={() => handleSort('address')}>address</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Rows for each record */}
                  {sortedusers.map(record => (
                    <tr key={record.id}>
                      <td>{record.name}</td>
                      <td>{record.email}</td>
                      <td>{record.id}</td>
                      {/* <td>{record.address}</td> */}
                      {record.address && (
              <p style={{ margin: '5px 0' }}>Address: {record.address.street}, {record.address.state}, {record.address.city}, {record.address.zipcode}</p>
            )}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Display a message if no users are found
              <p>No users found</p>
            )}
          </div>
        </div>
      ) : (
        <Login /> // Render the login component if not logged in
      )}
    </div>
  );
};

export default MainDashboard;
