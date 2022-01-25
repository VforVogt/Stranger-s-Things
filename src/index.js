import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Nav,
  AllPosts,
  Home,
  SignupOrLogin,
  EditOrCreatePost,
  Me,
  MyPosts,
  MyMessages,
  CreateMessage,
  NotFound,
} from "./components";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import "./index.css";

function App() {
  const { isLoggedIn, selectedPost } = useContext(AuthContext);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route exact path="/posts" component={AllPosts} />
        {!isLoggedIn && (
          <Switch>
            <Route path="/login" component={SignupOrLogin} />
            <Route path="/signup" component={SignupOrLogin} />
            <Route path="*" component={NotFound} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            <Route
              path="/posts/new"
              render={() => <EditOrCreatePost selectedPost={selectedPost} />}
            />
            <Route exact path="/me" component={Me} />
            <Route path="/me/posts" component={MyPosts} />
            <Route exact path="/me/messages" component={MyMessages} />
            <Route path="/me/messages/:postId" component={CreateMessage} />
            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
