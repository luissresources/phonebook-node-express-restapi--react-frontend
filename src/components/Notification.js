import React from 'react'

const Notification = ({message, typeNotification}) => {

  const styleInfo = {
    paddingLeft: 16,
    margin: '16px 0',
    fontSize: 16,
    border: '3px solid green',
    borderRadius: '5px',
    color: 'green',
    backgroundColor : '#E9E4E6'
  }

  const styleError = {
    paddingLeft: 16,
    margin: '16px 0',
    fontSize: 16,
    border: '3px solid red',
    borderRadius: '5px',
    color: 'red',
    backgroundColor : '#E9E4E6'
  }

  return (
    <>
      {
        message === null ?
          ''
        : 
          typeNotification === 'success' ?
            <div style={styleInfo}>
              <p>{message}</p>
            </div>
          :
            <div style={styleError}>
              <p>{message}</p>
            </div>
      }
    </>
  )
}

export default Notification;