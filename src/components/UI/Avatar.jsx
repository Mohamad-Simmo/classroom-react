import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Avatar = ({ fullName, margin }) => {
  return (
    <>
      <Dropdown className="ms-auto">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          AP
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={CustomMenu}
          style={{
            transform: 'translateX(-110px)',
          }}
          className="avatar-menu mt-3 bg-dark"
        >
          <Dropdown.Item
            eventKey="1"
            className="text-white avatar-menu-link-hover"
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className={'avatar text-bg-info'}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled m-0">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default Avatar;
