import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [backend, setBackend] = useState({
    loading: true,
    message: '',
    error: '',
  })

  useEffect(() => {
    let active = true

    fetch('/api/status')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`El servidor respondió con estado ${response.status}.`)
        }

        return response.json()
      })
      .then((data) => {
        if (active) {
          setBackend({ loading: false, message: data.message, error: '' })
        }
      })
      .catch((error) => {
        if (active) {
          setBackend({ loading: false, message: '', error: error.message })
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="app">
      <h1>AstraLogistics</h1>
      <p>Estado de conexión con el backend:</p>

      {backend.loading && <p role="status">Conectando...</p>}
      {backend.message && <p className="connection success">{backend.message}</p>}
      {backend.error && (
        <p className="connection error" role="alert">
          No se pudo conectar: {backend.error}
        </p>
      )}
    </main>
  )
}

export default App
