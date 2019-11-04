import React from 'react';
import styled from 'styled-components';

import logo from '../logo.svg';

const Wrapper = styled.a.attrs({
  className: 'navbar-brand mr-0 mr-md-2',
})`
  display: inline-block;
  padding: .3125rem 0;
  line-height: inherit;
`;

const Logo = () => (
  <Wrapper href="/">
    <img src={logo} width="50" height="50" alt="react-logo" />
  </Wrapper>
);

export { Logo as default };
