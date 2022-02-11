import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../config";

const CreateMesssageContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 400px;
    margin: 0 auto;
  }
  & textarea {
    height: 100px;
    width: 400px;
    margin-top: 2px;
  }
  & form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  & input {
    margin: 20px 0;
    padding: 8px;
    width: 140px;
  }
`;

export default function CreateMessage({ token }) {
  const history = useHistory();
  const { search } = useLocation();
  const searchObj = new URLSearchParams(search);
  const { postId } = useParams();
  const title = searchObj.get("title");

  const { content, setContent } = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Auhtorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: { content } }),
      });

      const { success } = await response.json();

      if (success) {
        history.push("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CreateMesssageContainer>
      <h2>Message the seller</h2>
      <p>Title: {title}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor={"content"}>Message:</label>
        <textarea onChange={handleChange}></textarea>
        <input type="submit" value="send message!" />
      </form>
    </CreateMesssageContainer>
  );
}
