import React, { PropTypes } from 'react';
// import { a } from 'react-router';

const Robot = (props) => {
  let { value } = props;
  const isString = typeof value === 'string';
  if (!isString) {
    value = value.map((item) => {
      const url = `/space/incubator/${item._id}`;
      return (
        <a key={`chatboot_card_${item._id}`} href={url} target="_blank">
          <h4>{item.name}</h4>
          <p>{item.address}</p>
        </a>
      );
    });
  }
  return (
    <div className="robot-chat" {...props}>
      <img src="BackImg/home-btn3.png" alt="robot avatar" />
      <p className="value">{value}</p>
    </div>
  );
};

Robot.propTypes = {
  value: PropTypes.any,
};

Robot.defaultProps = {
  value: '',
};


export default Robot;
