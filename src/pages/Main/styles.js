import styled, { keyframes, css} from 'styled-components'


export const Container = styled.div`
  margin: 80px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  background: #eee;
  border-radius: 10px;

  h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;

    svg {
      margin-right: 5px;
    }
  }

`;

export const Form = styled.form.attrs(props => ({}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    height: 50px;
    font-size: 16px;
    padding: 10px;
    margin-right: 10px;
    border: 2px solid #7159c1;
    border-radius: 5px;
  }

  ${props => props.error && css`
    input {
      color: red;
    }
  `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs( props => ({
  disabled: props.loading
}))`

  background: #7159c1;
  border: 0;
  color: #FFF;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    transform: translateY(-5px)
  }

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.6;

  }

  ${props => props.loading && css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }  
  `}

  
`;

export const ListRepos = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  li {
    margin-top: 10px;
    background: #FFF;
    padding: 10px;
    border-radius: 10px;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    span {
      font-size: 16px;
      font-weight: bold;
    } 

    a {
      cursor: pointer;
      text-decoration: none;
    }
  }
`;