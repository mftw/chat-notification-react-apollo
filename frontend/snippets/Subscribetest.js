import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

const HEARTBEAT_SUBSCRIPTION = gql`
  subscription {
    heartbeat
  }
`;

export default function Subcribe() {
  const { data, loading, error } = useSubscription(HEARTBEAT_SUBSCRIPTION);
  console.log("TCL: Subcribe -> data", data);
  return (
    <>
      <div>{error && "SUBERROR " + error.message}</div>
      <div>hb {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}</div>
    </>
  );
}
