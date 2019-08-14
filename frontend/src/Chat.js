import { useSubscription } from "@apollo/react-hooks";


const { data, loading, error } = useSubscription(HEARTBEAT_SUBSCRIPTION);
const HEARTBEAT_SUBSCRIPTION = gql`
  subscription {
    heartbeat
  }
`;