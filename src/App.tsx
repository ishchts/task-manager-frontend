import React from 'react';

import { Wrapper, Header, Content, Footer } from './components/layout';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          logo
          nav
        </Header>
        <Content>
          content
        </Content>
        <Footer>
          footer
        </Footer>
      </Wrapper>
    </React.Fragment>
  );
};
