import React from 'react';
import styled from 'styled-components';

import { Logo } from './Logo.jsx';
import { Links } from './Links.jsx';

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

export function NavBar() {
    return (
        <Container>
            <Nav>
                <Logo />
                <Links />
            </Nav>
        </Container>
    );
}
