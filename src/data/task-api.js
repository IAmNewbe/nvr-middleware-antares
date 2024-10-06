import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Alternatively, you can use fetch() if you don't want axios

export const TaskApi = async () => {
  try {
    const response = await axios.get('http://localhost:3000/getAllTasks');
    // Return the `data` field inside the response object
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return empty array in case of error
  }
};

export default TaskApi;
