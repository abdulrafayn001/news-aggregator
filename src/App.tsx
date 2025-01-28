import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold underline">News Aggregator</h1>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
