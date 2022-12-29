import React from 'react';
import { Link } from '@mui/material';
import { Layout } from '../../components/layout';
import withData from '../../components/HOC/with-data';
import withExpandable from '../../components/HOC/with-expandable';
import { CountryNames } from '../../components/example-hoc-comp/country-names';
import { MenuButton } from '../../components/example-hoc-comp/menu-button';

const CountryDropDown = withData(
  CountryNames,
  'https://api.countrylayer.com/v2/all'
);

const ExpandableMenuButton = withExpandable(MenuButton);
const Home = () => {
  return (
    <Layout>
      home page  <Link>activiti</Link>
      <CountryDropDown selected="United States" />
      <ExpandableMenuButton child='example menu' hidden={false} txt='toggle' />
    </Layout>
  );
};

export default Home;
