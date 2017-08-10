import React, { PropTypes } from 'react';

const Man = (props) => {
  return (
    <div className="man-chat" {...props}>
      <p>{props.value}</p>
      <img src="BackImg/home-btn3.png" alt="robot avatar" />
    </div>
  );
};

Man.propTypes = {
  value: PropTypes.str,
};

Man.defaultProps = {
  value: '',
};

export default Man;
