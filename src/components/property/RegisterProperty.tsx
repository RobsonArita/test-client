import React, { useState } from 'react';
import axios from 'axios';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { SelectorState } from '../../redux/reducers/authReducer';
import './RegisterProperty.css'

interface File {
  uid: string
  _id?: string
}

function removerPalavraEFormatar(stringOriginal: string, palavraARemover?: string) {
  // Dividir a string original usando a vírgula como delimitador
  let palavras = stringOriginal.split(',');

  // Remover a palavra específica, se presente na lista
  palavras = palavras.filter(palavra => palavra.trim() !== palavraARemover);

  // Juntar as palavras formatadas com vírgulas
  let novaString = palavras.join(',');

  return novaString;
}

const PropertyForm = () => {
  const [propertyInfo, setPropertyInfo] = useState({
    title: '',
    description: '',
    address: '',
    image: '',
  });

  const [files , setFiles]: [Array<File>, any] = useState([])

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPropertyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleImageChange = (info: { file: { status?: string, uid: string, response?: { _id: string; }; }; }) => {
    console.log({ info })
    if (info.file.status === 'done') {
      console.log({ response: info.file.response })

      const sentFiles = files
      sentFiles.push({ uid: info.file.uid, _id: info.file?.response?._id })
      setFiles(sentFiles)
      console.log({ files })

      // Atualiza o estado com a URL da imagem após o upload
      setPropertyInfo({
        ...propertyInfo,
        image: propertyInfo.image?.length ? propertyInfo.image + ',' + info.file.response?._id : info.file.response?._id ?? '',
      })
    }

    if (info.file.status === 'removed') {
      const removedFile = files.find(file => file.uid === info.file.uid)
      console.log({ removedFile })
      if (removedFile) {
        const filesFromPropertyInfo = propertyInfo.image
        const updated = removerPalavraEFormatar(filesFromPropertyInfo, removedFile?._id)
        setPropertyInfo({
          ...propertyInfo,
          image: updated
        })
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 

    const formData = new FormData()
    formData.append('title', propertyInfo.title)
    formData.append('description', propertyInfo.description)
    formData.append('address', propertyInfo.address)
    formData.append('image', propertyInfo.image)

    try {
      const response = await axios.post('http://localhost:3000/properties', formData);
      // Lidar com a resposta do servidor, se necessário
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar imóvel', error);
    }
  };

  const token: string | null = useSelector((state: SelectorState) => state.auth?.token)
  const getToken = () => token ?? ''


  return (
    <div className='divForm'>
          <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" value={propertyInfo.title} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="address">Endereço:</label>
        <input type="text" id="address" name="address" value={propertyInfo.address} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição:</label>
        <textarea id="description" name="description" value={propertyInfo.description} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagens:</label>
        <Upload
          action={process.env.REACT_APP_BASE_URL + '/auth/file/upload'}
          method="post"
          headers={{
            Authorization: getToken(),
          }}
          listType="picture"
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>

      <button type="submit">Cadastrar Imóvel</button>
    </form>
    </div>
  )
};

export default PropertyForm;

/**
 * cada upload gera uma requisição post que salva o file.
 * após envio, o image será uma string separada por virgulas com as urls
 * back precisa salvar isso TODODODO
 */