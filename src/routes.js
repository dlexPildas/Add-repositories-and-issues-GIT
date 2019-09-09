import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom' 

import Main from './pages/Main/index'
import Repository from './pages/Repository/index'

export default function Routes() {
  return (
    <BrowserRouter>
      
        <Route path='/' exact component={Main}></Route> 
        <Route path='/repository/:repo' component={Repository}></Route>        
      
    </BrowserRouter>
  )
}