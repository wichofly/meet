import { mockData } from "./mock-data";

import axios from 'axios';
import NProgress from 'nprogress';
import './nprogress.css';

/**
 *
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const checkToken = async (accessToken) => {
  try {
    const result = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
    return await result.json();
  } catch (error) {
    error.json();
  }
};

// this function checks whether there’s a path, then build the URL with the current path (or build the URL without a path using window.history.pushState()).
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// written with the try…catch statement.
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch('https://cccdyv5sxf.execute-api.eu-central-1.amazonaws.com/dev/api/token' + 
    '/' + encodeCode);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
};

// const getToken = async (code) => {
//   const encodeCode = encodeURIComponent(code);
//   const { access_token } = await fetch(
//     'https://cccdyv5sxf.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .catch((error) => error);

//   access_token && localStorage.setItem("access_token", access_token);

//   return access_token;
// };

export const getEvents = async () => {
  NProgress.start();

  // if you’re using localhost, you return the mock data; otherwise, you use the real API.
  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  // In the code below, the line !navigator.onLine checks whether the user is offline, but this only works if there’s no internet.
  // If they are offline, the stored event list is loaded, parsed, and returned as events.
  // it is about getAccessToken() because you don’t need to check for an access token if the user is offline.
  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://cccdyv5sxf.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + 
    '/' + token;
    
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://cccdyv5sxf.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
}