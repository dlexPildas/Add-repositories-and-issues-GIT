import styled from 'styled-components'

export const Container = styled.header`
  background: #7159c1;
  height: 68px;
  border: 0px;
  border-radius: 1px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;

`;


export const Title = styled.h2`
  color: white;
  font-weight: bold;
`;

export const Box1 = styled.div`
  display:flex;
  align-items: center;

  h5 {
    margin-right: 10px;
    color: white;
    font-weight:bold;
  }

  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
`;