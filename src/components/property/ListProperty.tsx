import React, { useState, useEffect } from 'react';
import errorHandler from '../../functions/errorHandler';
import { IProperty, fetchPropertyes, propertyAPI } from '../../api/property';
import './ListProperty.css';
import { Button, Card } from 'antd';
import { useSelector } from 'react-redux';
import { translateUserLevel } from '../../functions/translate';
import { SelectorState } from '../../redux/reducers/authReducer';
import { IUser, UserLevels } from '../../interfaces/user';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const { Meta } = Card;

function PropertyCard({ property }: { property: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => Math.min(property.image.length - 1, prevIndex + 1));
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      cover={
        <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
          {showArrows && currentImageIndex > 0 && (
            <Button
              type="primary"
              shape="circle"
              icon={<LeftOutlined />}
              style={{ position: 'absolute', top: '50%', left: '5px', transform: 'translateY(-50%)', zIndex: 1 }}
              onClick={handlePrevImage}
            />
          )}
          {showArrows && currentImageIndex < property.image.length - 1 && (
            <Button
              type="primary"
              shape="circle"
              icon={<RightOutlined />}
              style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)', zIndex: 1 }}
              onClick={handleNextImage}
            />
          )}
          <img alt={property.address} src={property.image[currentImageIndex]} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }} />
        </div>
      }
    >
      <Meta title={property.title} description={property.description} />
    </Card>
  );
}

function ListProperty() {
  console.log('ListProperty');
  const [page, setPage] = useState(1);
  const [imoveis, setImoveis] = useState([]);
  const [error, setError] = useState('');

  const token: string | null = useSelector((state: SelectorState) => state.auth?.token);

  useEffect(() => {
    async function fetchImoveis() {
      try {
        console.log({ token });
        const data = token
          ? await new propertyAPI(token).authProperties(page)
          : await fetchPropertyes(page);
        console.log(data.paginate);
        setImoveis(data.paginate?.docs);
      } catch (error) {
        setError(errorHandler(error));
      }
    }

    fetchImoveis();
  }, [page]);

  const isAuthenticated: boolean = useSelector((state: SelectorState) => Boolean(state?.auth?.token));
  const userLevel: IUser['level'] | string = useSelector((state: SelectorState) => state?.auth?.user?.level);

  const canCreate = isAuthenticated && userLevel === UserLevels.proprietario;

  return (
    <div>
      <div className='mob-header'>
        <h1>Imóveis</h1>
        <div className='div-right'>
          {canCreate && <Button shape='round' type='primary'>Cadastrar Imóvel</Button>}
        </div>
      </div>
      <div className="property-grid">
        {imoveis.map((imovel: any) => (
          <PropertyCard key={imovel._id} property={imovel} />
        ))}
      </div>
      <div>
        <Button type='primary' onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </Button>
        <Button type='primary' onClick={() => setPage(page + 1)}>Próxima</Button>
      </div>
      {error && <div style={{ color: '#ff0000', fontSize: '20px' }}>{error}</div>}
    </div>
  );
}

export default ListProperty;
