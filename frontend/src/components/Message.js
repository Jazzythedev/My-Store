import React from 'react'
import { Alert } from 'react-bootstrap'     /* Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages. */

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>   /* in react, 'alert' is a component that displays a short, important message in a way that attracts the user's attention without interrupting the user's task */
}

Message.defaultProps = {
  variant: 'info',                  /* info varian refers to one of the styling options. */
}

export default Message  