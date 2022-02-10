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
        const response = await fetch(`${API_URL}/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = await response.json();

        setPosts(data.posts.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [me]);

  const [meFlag, setMeFlag] = useState(false);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            "Content Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { data: me } = await response.json();

        setMe(me);
      } catch (err) {
        console.log(err);
      }
    };
  }, [token, meFlag]);

  const updateMe = () => {
    setMeFlag(!meFlag);
  };

  return (
    <Router>
      <main>
        <Nav
          isLogged={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setMe={setMe}
        />
        <Route
          exact
          path={"/"}
          render={() => (
            <Posts posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          exact
          path={"/home"}
          render={() => (
            <Posts posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} />
          )}
        />
        {!isLoggedIn && (
          <Switch>
            <Route
              exact
              path={"/login"}
              render={() => (
                <LoginOrRegister
                  setToken={setToken}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            />
            <Route
              exact
              path={"/register"}
              render={() => (
                <LoginOrRegister
                  setToken={setToken}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            />
          </Switch>
        )}
        {isLoggedIn && <Switch></Switch>}
      </main>
    </Router>
  );
}
