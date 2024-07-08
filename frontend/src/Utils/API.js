import axios from "axios";
import { URL_Path } from "./constant";

const postApi = async (data, route) => {
  
  
  try {
    const url = `${URL_Path}${route}`;

    
    // Create FormData
    const formData = new FormData();
    
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] instanceof FileList) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
  

    // Log formData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Set headers for authorization
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Make POST request using Axios
    const response = await axios.post(url, formData, { headers });

    return response;
  }
   catch (error) {
    console.error("Error in postApi:", error);
    throw error;
  }

};

// GET API
const getApi = async (route) => {
  try {
    const url = `${URL_Path}${route}`;

    const accessToken = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, { headers });

    return response;
  } catch (error) {
    console.error("Error in getApi:", error);
    throw error;
  }
};

// PUT API
const putApi = async (data, route) => {
  try {
    const url = `${URL_Path}${route}`;
    const formData = new FormData();

    // Append data to FormData
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] instanceof FileList) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    // Log formData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Set headers for authorization
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Make PUT request using Axios
    const response = await axios.put(url, formData, { headers });

    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error in putApi:", error);
    throw error; // Throw the error for handling in the calling function
  }
};

// DELTE API

const deleteApi = async (route) => {
  try {
    const url = `${URL_Path}${route}`;

    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Set headers for authorization
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Make PUT request using Axios
    const response = await axios.delete(url, { headers });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error in deleteApi:", error);
    throw error; // Throw the error for handling in the calling function
  }
};

export { postApi, getApi, putApi, deleteApi };
