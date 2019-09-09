import React from 'react'

import { Link } from 'react-router-dom'

import { Container, Form, SubmitButton, ListRepos } from './styles'

import { FaGithubAlt , FaPlus, FaSpinner } from 'react-icons/fa'

import Header from '../../components/Header'
 
import api from '../../service/api'

class Main extends React.Component {
  
  state = {
    newRepo: '',
    repos: [],
    loading: false,
    error: false
  }

  //load the repositories stored 
  componentDidMount() {
    const repos = localStorage.getItem('repos')

    if ( repos ) {
      this.setState({repos: JSON.parse(repos)})
    }
  }


  //
  componentDidUpdate(_, prevState) {
    const { repos } = this.state
    
    if( prevState.repos !== repos ) {
      localStorage.setItem('repos', JSON.stringify(repos))
    }
  }
  
  handleInputChange = e => {
    this.setState({ 
      newRepo: e.target.value,
      error: false
    })
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const { newRepo, repos } = this.state

    this.setState({loading: true})

    try {

      repos.map( repo => {
        if (repo.nome === newRepo ){
          throw new Error ('Repositório duplicado')
        }
      })

      const response = await api.get(`/repos/${newRepo}`)
      
      const data = {
        id: repos.length +1,
        nome: response.data.full_name,
        url: response.data.html_url
      }
  
      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false,
        error: false
      })
    }
    catch(err){
      this.setState({
        loading: false,
        error: true
      })  
    }
     
  }

  render (){

    const { newRepo, repos, loading, error } = this.state


    return (
      <>
        <Header />
  
        <Container>
          
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>
  
          <Form  onSubmit={this.handleSubmit} error={error}>
            <input 
              type='text' 
              placeholder= {error ? 'Repositório inválido/duplicado' :'Adicionar repostórios' }
              value={error ? '' : newRepo}
              onChange={this.handleInputChange}
            />            
  
            <SubmitButton type='submit' loading={loading}>
              {loading ? <FaSpinner /> : <FaPlus /> }              
            </SubmitButton>
          </Form>

          <ListRepos>
            { repos.length > 0 && repos.map( repo => (
              <li key={repo.id}>
                <span>{repo.nome}</span>
                <Link to={`/repository/${encodeURIComponent(repo.nome)}`}>Detalhes</Link>
                </li>
            ))}            
          </ListRepos>
        </Container>
      </>
    )
  }
  
  
}

export default Main