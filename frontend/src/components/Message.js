import React from 'react'
import { Alert } from 'react-bootstrap'     /* Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages. */

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',                  /* info varian refers to one of the styling options. */
}

export default Message  