import styled, {keyframes, css} from 'styled-components'

export const Container = styled.div.attrs()`
  margin: 80px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  background: #eee;
  border-radius: 10px;

  img {
    width:100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px 0;
  }

  p {
    font-weight: bold;
    margin: 10px 0;
  }

  ${ props => props.loading && css`
    svg  {
      animation: ${rotate} 2s linear infinite
    } 
  `
  }
`;

export const Issues = styled.ul`
  list-style: none;
  padding: 10px;
  display: flex;
  flex-direction: column;

  li {    
    border: 2px solid #7159c1;
    margin: 10px;
    background: #FFF;
    padding: 0 10px;
    border-radius: 10px;
    display:flex;
    align-items: center;
     
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 5px;
    }

    a {
      text-decoration: none;
      font-weight: bold;
      color: #333;

      &:hover {
        color: #7159c1;
      }
    }

    span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: bold;
        padding: 3px 4px;
        margin-left: 10px;
      }
  }
`;

export const Filter = styled.div`  
  width: 90%;
  display:flex;
`;

export const FilterButton = styled.button.attrs(props => ({
  disabled: props.disabled
}))`
  flex: 1;
  margin: 0 10px;
  margin-top: 10px;
  font-weight: bold;
  border: 0;
  border-radius: 5px;

  &:hover {
    background: #7159c1;
    color: white;
    opacity: 0.3
  }

  &[disabled] {
    display: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

