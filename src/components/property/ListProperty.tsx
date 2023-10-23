import React, { useState, useEffect } from 'react'
import errorHandler from '../../functions/errorHandler'
import { fetchPropertyes } from '../../api/property'
import './ListProperty.css'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { translateUserLevel } from '../../functions/translate'
import { SelectorState } from '../../redux/reducers/authReducer'
import { IUser, UserLevels } from '../../interfaces/user'

function ListProperty() {
  console.log('ListProperty')
  const [page, setPage] = useState(1)
  const [imoveis, setImoveis] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const data = await fetchPropertyes(page)
        console.log(data.paginate)
        // const data = { results: [{ id: '1', nome: 'ImovelUm' }, { id: '2', nome: 'ImovelUm' }, { id: '3', nome: 'ImovelUm' }] }
        setImoveis(data.paginate?.docs)
      } catch (error) {
        setError(errorHandler(error))
        // Trate os erros de forma adequada
      }
    }

    fetchImoveis()
  }, [page])

  const isAuthenticated: boolean = useSelector((state: SelectorState) => Boolean(state?.auth?.token))
  const userLevel: IUser['level'] | string = useSelector((state: SelectorState) => 
  state?.auth?.user?.level)

  const canCreate = isAuthenticated && userLevel === UserLevels.proprietario
  return (
    <div>
      <div className='mob-header'>
        <h1>Imóveis</h1>
        <div className='div-right'>
          {canCreate && <Button className='boris' shape='round' type='primary'>Cadastrar Imóvel</Button>}
        </div>
      </div>
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
      {error && <div style={{ color: '#ff0000', fontSize: '20px' }}>{error}</div>}
    </div>
  )
}

export default ListProperty
