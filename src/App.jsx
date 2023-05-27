import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home/Home'
import { ReactQueryDevtools } from 'react-query/devtools'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App