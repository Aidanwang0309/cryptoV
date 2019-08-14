import React from "react";
import styled from "styled-components";

const ConfirmButton = styled.div`
  margin: 10px;
  padding: 20px;
  width: 10rem;
  text-align: center;
  color: #35d6b8;
  box-shadow: inset 0px 0px 15px -2px #35d6b8;
  cursor: pointer;
`;

const Button = props => {
  const { name, handleClick } = props;

  return <ConfirmButton onClick={() => handleClick()}>{name}</ConfirmButton>;
};

export default Button;
