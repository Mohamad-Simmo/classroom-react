const Message = ({ children, className }) => {
  return (
    <div
      className={'py-2 px-3 mb-2 rounded-pill ' + className}
      style={{
        width: 'fit-content',
      }}
    >
      {children}
    </div>
  );
};
export default Message;
