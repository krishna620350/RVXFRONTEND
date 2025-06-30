import React from "react";

export interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  console.log("Notification component rendering with:", { message, type });
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
        backgroundColor: '#ff0000',
        color: 'white',
        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        border: '5px solid yellow',
        borderRadius: '10px',
        boxShadow: '0 0 50px rgba(255,0,0,0.8)',
        textAlign: 'center',
        minWidth: '400px',
      }}
    >
      🔥 NOTIFICATION TEST 🔥
      <br />
      {message}
      <br />
      <button
        onClick={onClose}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        CLOSE
      </button>
    </div>
  );
};

// Notification list for the dropdown - moved to separate export
export const getNotificationList = (): NotificationProps[] => [
  { message: "You have a new friend request from Alice!", type: "info" },
  { message: "Bob commented on your post.", type: "info" },
  { message: "Your post was seen by 10 people.", type: "success" },
  { message: "Failed to send friend request.", type: "error" },
  { message: "Welcome to SocialApp! 🎉", type: "success" },
  { message: "New message from Sarah", type: "info" },
  { message: "Your profile was viewed by 5 people", type: "info" },
  { message: "Post scheduled successfully", type: "success" },
  { message: "Network connection restored", type: "success" },
  { message: "System maintenance in 2 hours", type: "warning" },
];

export default Notification;
