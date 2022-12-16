import React, { useEffect } from 'react'
export const App: React.FC = () => {
  useEffect(() => {
    fetch('https://fastify-task-manager-api-production.up.railway.app/users')
      .then(async res => {
        console.log('res', res)
        return await res.json()
      })
      .then(json => {
        console.log('json', json)
      })
      .catch((e) => {
        console.log('ee', e)
      })
  }, [])
  return (
    <div className="App">
      Appas
    </div>
  )
}
