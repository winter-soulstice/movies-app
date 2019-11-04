import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Collapse = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``;

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})``;

const Item = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``;

const cinema = 'Cinema';
const movies = 'Movies';
const create = 'Create Movie';

const Links = () => (
  <div>
    <Link to="/" className="navbar-brand">
      {cinema}
    </Link>
    <Collapse>
      <List>
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
