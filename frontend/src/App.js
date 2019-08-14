import React, { useEffect, useState } from "react";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./App.css";

// const HEARTBEAT_SUBSCRIPTION = gql`
//   subscription {
//     heartbeat
//   }
// `;
const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    message {
      username
      content
    }
  }
`;

// const MESSAGE_MUTATION = gql`
//   mutation {
//     message(message: {
//       username: $username
//       content: $content
//       }) {
//       username
//       content
//     }
//   }
// `;

const MESSAGE_MUTATION = gql`
  mutation {
    message(content: $Content username: $Username) {
    # message($content: String! $username: String!) {
      username
      content
    }
  }
`;

// const MESSAGE_MUTATION = gql`
//   mutation {
//   message(message: {username: "tester123" content:"asdfkjasflkasjdhf"}) {
//     username
//     content
//   }
// }
// `;

// const MESSAGE_MUTATION = gql`
//   mutation {
//     message($message: InputMessage) {
//       username
//       content
//     }
//   }
// `;

function App() {
  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [addMessage, { data: mutationData }] = useMutation(MESSAGE_MUTATION);

  // Using effect to save older messages
  useEffect(() => {
    if(data) {
      console.log(data);
      const localLog = [...chatLog];
      localLog.push({...data.message, date: new Date()})
      setChatLog(localLog);
    }
  }, [data, setChatLog])

  function handleSubmitMessage() {
    console.log(usernameInput, chatInput);
    addMessage({
      variables: {
        message: {
          Username: usernameInput,
          Content: chatInput,
        },
        Username: usernameInput,
        Content: chatInput,
      }

    });
    setChatInput("");
  }

  // function handleChange(e) {
  //   // e.preventDefault();
  //   e.stopPropagation();
  //   if(e.target.name === "username") {
  //     setUsernameInput(e.target.value)
  //   } else if (e.target.name === "chatinput") {
  //     setChatInput(e.target.value)
  //   }
  // }

  return (
    <div className="App">
      <div>{error && "SUBERROR " + error.message}</div>
      <div>
        {/* {chatLog.length > 0 && chatLog.map((message, i) => ( */}
        {chatLog.map((message, i) => (
          <div key={"message" + i}>
            <h2>{message.username}</h2>
            <p>{message.content}</p>
            <span>{message.date.toLocaleTimeString()}</span> <br/>
            <span>{message.date.toLocaleDateString()}</span>
            <hr/>
          </div>
        ))}
      </div>
      <div>
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
