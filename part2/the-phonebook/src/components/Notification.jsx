export const Notification = ({ message, type }) => {
  let notificationStyle;
  const test =
    type === 'success'
      ? (notificationStyle = {
          color: 'green',
          background: 'lightgrey',
          fontSize: '20px',
          borderStyle: 'solid',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '10px',
        })
      : (notificationStyle = {
          color: 'red',
          background: 'lightgrey',
          fontSize: '20px',
          borderStyle: 'solid',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '10px',
        });
  if (message === null) {
    return null;
  }

  return <div style={test}>{message}</div>;
};
