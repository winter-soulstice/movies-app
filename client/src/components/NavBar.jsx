import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Links from './Links';

const Container = styled.div`
  min-width: 100%;
`;

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand navbar-light bg-dark flex-column flex-md-row bd-navbar',
})`
`;

const NavBar = () => (
  <Container>
    <Nav>
      <Logo />
      <Links />
    </Nav>
  </Container>
);

export { NavBar as default };
