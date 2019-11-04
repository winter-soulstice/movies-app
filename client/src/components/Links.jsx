import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
  className: 'navbar-nav-scroll',
})`
  max-width: 100%;
  height: 2.5rem;
  margin-top: .25rem;
  overflow: hidden;
`;

const List = styled.ul.attrs({
  className: 'navbar-nav bd-navbar-nav flex-row',
})`
  padding-bottom: 2rem;
  overflow-x: auto;
`;

const Item = styled.li.attrs({
  className: 'nav-item',
})`
  a {
    color: #09d3ac !important;
    overflow: hidden;
  };
`;

const cinema = 'Cinema';
const movies = 'Movies';
const create = 'Create Movie';

const Links = () => (
  <div>
    <Collapse>
      <List>
        <Item>
          <Link to="/" className="nav-link">
            {cinema}
          </Link>
        </Item>
        <Item>
          <Link to="/movies/list" className="nav-link">
            {movies}
          </Link>
        </Item>
        <Item>
          <Link to="/movies/create" className="nav-link">
            {create}
          </Link>
        </Item>
      </List>
    </Collapse>
  </div>
);

export { Links as default };
