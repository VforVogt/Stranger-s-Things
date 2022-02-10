import React, { useState, useeffect, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_URL } from "./config";
import { getTokenFromLocalStorage } from "./util";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useState(false);
  const { token, setToken } = useState(null);
  const { posts, setPosts } = useState([]);
  const { me, setMe } = useState({});

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (token) {
      setIsLoggedIn(true);
      setToken(token);
    }

    const getPosts = async () => {
      try {
        const response = await fetch(`${API_URL}`);
      } catch (err) {
        throw err;
      }
    };
  });
}
