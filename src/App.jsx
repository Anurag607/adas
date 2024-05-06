import './App.css'
import { Dashboard } from './components/dashboard'

function App() {
  return (
    <main className="h-screen w-[95vw] grid place-items-center mx-auto relative">
      <Dashboard />
      <div className="w-full h-[6vh]" />
    </main>
  )
}

export default App
