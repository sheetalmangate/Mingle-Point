import { useQuery, useSubscription } from '@apollo/client';
import {useEffect, useState} from 'react';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { GET_MESSAGES } from '../utils/queries';
import { MESSAGE_ADDED_SUBSCRIPTION } from '../utils/subscription.js';

function Messages({ sender, receiver }: { sender: string; receiver: string }) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { sender, receiver },
    fetchPolicy: 'network-only',
  });

  const { data: subscriptionData, error: subscriptionError } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION);

  const [messages, setMessages] = useState<Array<{ id: string; sender: string; content: string; timestamp: string }>>([]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
     if (subscriptionData && subscriptionData.messageAdded) {
      setMessages((prevMessages) => [...prevMessages, subscriptionData.messageAdded]);
    }
  }, [subscriptionData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (subscriptionError) return <p>Error: {subscriptionError.message}</p>;


  const timeZone = 'America/Los_Angeles';


  return (
    <div>
      {messages.map((message) => {
        try{
          const date = new Date(parseInt(message.timestamp, 10));
          const zonedDate = toZonedTime(date, timeZone);
          const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss zzz');

        

        return (
          <div key={message.id}>
            <div>{formattedDate}</div>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        );
      } catch (error) {
        console.error('Invalid timestamp:', message.timestamp, error);
        return null;
      }
      })}
    </div>
  );
}
export default Messages;