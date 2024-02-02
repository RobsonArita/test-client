import React, { useState } from 'react';
import axios from 'axios';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface File {
  uid: string
  url: string
}

function removerPalavraEFormatar(stringOriginal: string, palavraARemover: string) {
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

  const handleImageChange = (info: { file: { status: string, uid: string, response: { url: any; }; }; }) => {
    console.log({ info })
    if (info.file.status === 'done') {
      if (!info.file.response.url) info.file.response.url = 'mockedUrl'
      console.log({ a: info.file.response.url })

      const sentFiles = files
      sentFiles.push({ uid: info.file.uid, url: info.file.response.url })
      setFiles(sentFiles)
      console.log({ files })

      // Atualiza o estado com a URL da imagem após o upload
      setPropertyInfo({
        ...propertyInfo,
        image: propertyInfo.image?.length ? propertyInfo.image + ',' + info.file.response.url : info.file.response.url,
      })
    }

    if (info.file.status === 'removed') {
      const removedFile = files.find(file => file.uid === info.file.uid)
      console.log({ removedFile })
      if (removedFile) {
        const filesFromPropertyInfo = propertyInfo.image
        const updated = removerPalavraEFormatar(filesFromPropertyInfo, removedFile.url)
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
    formData.append('image', propertyInfo.image)

    try {
      const response = await axios.post('http://localhost:3000/properties', formData);
      // Lidar com a resposta do servidor, se necessário
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar imóvel', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="title" value={propertyInfo.title} onChange={handleInputChange} />
      </label>

      <label>
        Descrição:
        <textarea name="description" value={propertyInfo.description} onChange={handleInputChange} />
      </label>

      <label>
        Imagem:
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" // rota back para upload
          listType="picture"
          // @ts-ignore
          onChange={handleImageChange} // Adiciona a função para lidar com as mudanças de upload
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </label>

      <button type="submit">Cadastrar Imóvel</button>
    </form>
  );
};

export default PropertyForm;

/**
 * cada upload gera uma requisição post que salva o file.
 * após envio, o image será uma string separada por virgulas com as urls
 * back precisa salvar isso TODODODO
 */