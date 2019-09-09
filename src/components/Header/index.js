import React from 'react'

import logo from '../../assets/logo.jpeg'

import { Container, Title, Box1 } from './style'
 
function Header() {
  return (
    <Container>
      <Title>Desafio | 05</Title>
      <Box1>
        <h5>Aluno</h5>
        <img src={logo} alt='Foto'/>
      </Box1>
    </Container>
  )
}

export default Header;