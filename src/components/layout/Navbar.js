import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px;
    margin-bottom: 40px;
    padding: 40px;
  `;

  //   const Logo = styled.div`
  //       font-size= 1.5em;
  //   `;

  const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props =>
      props.active &&
      css`
        text-shadow: 0px 0px 30px #03ff03;
      `}
  `;

  const toProperCase = lower => lower.charAt(0).toUpperCase() + lower.substr(1);

  const ControlButton = ({ name, active }) => {
    return (
      <ControlButtonElem active={name === page} onClick={() => setPage(name)}>
        {toProperCase(name)}
      </ControlButtonElem>
    );
  };

  const [page, setPage] = useState("dashboard");

  return (
    <Bar>
      <div> CryptoDash </div>
      <div />
      <Link to="dashboard" style={{ textDecoration: "none", color: "white" }}>
        <ControlButton name="dashboard" />
      </Link>
      <Link to="setting" style={{ textDecoration: "none", color: "white" }}>
        <ControlButton name="settings" />
      </Link>
    </Bar>
  );
};

export default Navbar;
