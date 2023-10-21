import React, { useState, useEffect } from 'react'
import { getImoveis } from '../../api/property'

function ListProperty() {
  console.log('ListProperty')
  const [page, setPage] = useState(1)
  const [imoveis, setImoveis] = useState([])

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const data = await getImoveis(page)
        setImoveis(data.results)
      } catch (error) {
        // Trate os erros de forma adequada
      }
    }

    fetchImoveis()
  }, [page])

  return (
    <div>
      <h2>Lista de Imóveis</h2>
      <ul>
        {imoveis.map((imovel: any) => (
          <li key={imovel.id}>{imovel.nome}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)}>Próxima</button>
      </div>
    </div>
  )
}

export default ListProperty
