import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { Title } from '../title/style';
import { MapStubContainer } from './style';

const MapStub = () => (
  <MapStubContainer>
      <Title variant="h2">
          Заказ такси недоступен
      </Title>
      <p>
          Пожалуйста, заполните данные
          {' '}
          <Link
              to='/profile'
              component={RouteLink}
          >
              банковской карты
          </Link>
      </p>
  </MapStubContainer>
);

export default MapStub;
