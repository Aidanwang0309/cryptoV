import React from "react";
import Navbar from "../layout/Navbar";
import styled from "styled-components";

const Layout = styled.div`
  padding: 40px;
`;

const Home = () => {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};

export default Home;
