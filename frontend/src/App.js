import React, { useEffect, useState } from "react";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./App.css";

const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    message {
      username
      content
      date
    }
  }
`;

const MESSAGE_MUTATION = gql`
  mutation createMessage($Content: String $Username: String) { 
    createMessage(content: $Content username: $Username) { 
      username 
    } 
  }
`;

function App() {
  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [addMessage, { data: mutationData }] = useMutation(MESSAGE_MUTATION);

  // Using effect to save older messages
  useEffect(() => {
    if(data) {
      // console.log(data);
      const localLog = [...chatLog];
      localLog.push({...data.message})
      setChatLog(localLog);
    }
  }, [data])

  function handleSubmitMessage() {
    if(!usernameInput || !chatInput) return;

    const usernameCheck = usernameInput.trim();
    const chatInputCheck = chatInput.trim();

    if(usernameCheck.length === 0 || chatInputCheck.length === 0) return;

    addMessage({
      variables: { 
        Content: chatInput, 
        Username: usernameInput 
      }
    });
    setChatInput("");
  }

  return (
    <div className="App">
      <div className="chat-container">
        <div>{error && "SUBERROR " + error.message}</div>
        <div>
          {/* {chatLog.length > 0 && chatLog.map((message, i) => ( */}
          {chatLog.map((message, i) => (
            <div key={"message" + i}>
              <h2>{message.username}</h2>
              <p>{message.content}</p>
              <span>{new Date( + message.date).toLocaleDateString()}</span> <br/>
              <span>{new Date( + message.date).toLocaleTimeString()}</span>
              <hr/>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input" >
        <label htmlFor="chatinput">Message</label>
        <input type="text" value={chatInput} name="chatinput" onChange={e => setChatInput(e.target.value)} />
        <button onClick={handleSubmitMessage}>Send</button> <br/>



        <label htmlFor="username">Username</label>
        <input type="text" value={usernameInput} name="username" onChange={e => setUsernameInput(e.target.value)} />
      </div>
      {/* <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}</div> */}
    </div>
  );
}

export default App;
