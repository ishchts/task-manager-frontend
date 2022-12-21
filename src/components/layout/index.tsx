import styled from '@emotion/styled';
import { Container } from '@mui/system';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledHeader = styled.header`
  height: 70px;
  background-color:  #3198ff;
`;

export const StyledHeaderContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
`;

export const StyledContent = styled.div`
  flex: 1 0 auto;
`;

export const StyledFooter = styled.footer`
  flex: 0 0 auto;
  background-color: lightgray;
  height: 60px;
`;
