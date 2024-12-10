export interface SendMessageProps {
    receiver: string;
    message: string;
    setMessage: (message: string) => void;
    onSendMessage: (message: string) => void;
  }