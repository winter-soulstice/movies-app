import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Links from './Links';

const Container = styled.div.attrs({
  className: 'container',
})``;

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-light bg-light',
})`
    margin-bottom: 20 px;
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
