import React from 'react'

import { Link } from 'react-router-dom'

import Header from '../../components/Header'

import { Container, Issues, Filter, FilterButton, Actions } from './style'

import api from '../../service/api'

import { FaSpinner, FaSadTear } from 'react-icons/fa'

class Repository extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      repositorio: {},
      issues: [],
      filter: 'all',
      currentPage: 1,
      erro: false
    }
  }

  async componentDidMount () {
    this.setState({loading: true}) //put true for loading
    await this.loadIssues('all')
    this.setState({loading: false}) //put true for loading
  }

  //load the issues 
  loadIssues = async (filter, page=1) => {

    const repoName = decodeURIComponent(this.props.match.params.repo) 
    
    try{
      //get the datas of the repository and of the issues
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filter,
            page: page
          }
        })
      ])

      //add the datas need for a object call "data"
      const data = {
        nome: repository.data.full_name,
        descricao: repository.data.description,
        avatar: repository.data.owner.avatar_url
      }

      //update the values of the repository and of the issues
      this.setState({
        repositorio: data,
        issues: issues.data,
      })
    }catch(err){
      this.setState({
        erro: true
      })
    }

  }

  //advance to next page
  nextPage = () => {
    const { currentPage, filter } = this.state

    const pageNumber = currentPage+1

    this.loadIssues(filter, pageNumber)

    this.setState({
      currentPage: pageNumber
    })

  }

  //back to previos page
  prevPage = () => {
    const { currentPage, filter } = this.state

    if (currentPage === 1) return

    const pageNumber = currentPage-1

    this.loadIssues(filter, pageNumber)

    this.setState({
      currentPage: pageNumber
    })

  }

  //uptade the filter for search the issues
  handleButtonChange = filter => {
    this.setState({
      filter: filter
    })
    this.loadIssues(filter)    
  }

  render(){
    
    const { repositorio, loading, issues, erro, currentPage} = this.state

    return (
      <>
        <Header />

        <Container loading>
          {/*check if the page was did load*/ }
          {loading ? 
            <FaSpinner /> : 
            (
              erro ? 
                <>
                  <h1>Erro :(</h1>
                </>
                 : (
                  <>
                    <Link to='/'>Voltar</Link>
                    <img 
                      src={repositorio.avatar} 
                      alt={repositorio.nome} 
                    />
                    <h2>{repositorio.nome}</h2>
                    <p>{repositorio.descricao}</p>

                    <Filter onSubmit={e => e.preventDefault()}>
                      <FilterButton onClick={ ()=>this.handleButtonChange('all')  }>All</FilterButton>
                      <FilterButton onClick={ ()=>this.handleButtonChange('open') }>Open</FilterButton>
                      <FilterButton onClick={ ()=>this.handleButtonChange('closed') }>Closed</FilterButton>
                    </Filter>
                    
                    {/*Issues' List*/}
                    <Issues>
                      {issues.map(issue => (
                        <li key={issue.id}>
                          <img src={issue.user.avatar_url} alt={issue.user.login} />  
                          <a href={issue.html_url}>{issue.title}</a>
                          {issue.labels.map( label => (
                            <span key={String(label.id)}>{label.name}</span>
                          ))}
                        </li>
                      ))}

                      {/*Buttons for page's changing*/}
                      <Actions>
                        <FilterButton disabled={currentPage === 1 ? true : false} onClick={ this.prevPage }>Anterior</FilterButton>
                        <FilterButton onClick={ this.nextPage }>Próximo</FilterButton>
                      </Actions>
                    </Issues>
                  </>
                )
              
            )
          } 
        </Container>
        
      </>
      
    )
  }

}

export default Repository