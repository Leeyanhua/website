import React, { PropTypes } from 'react';
import Man from './Man';
import Robot from './Robot';

const ChatList = (props) => {
  const { list } = props;
  return (
    <div className="bot-dialog" id="main-chat-list">
      {list.map((item) => {
        if (item.from) {
          return <Robot key={item.id} id={item.id} value={item.value} />;
        }
        return <Man key={item.id} id={item.id} value={item.value} />;
      })}
    </div>
  );
};

ChatList.propTypes = {
  list: PropTypes.array,
};

ChatList.defaultProps = {
  list: [],
};

export default ChatList;
