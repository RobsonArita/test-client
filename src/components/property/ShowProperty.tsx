import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import errorHandler from '../../functions/errorHandler';
import { IProperty, propertyAPI } from '../../api/property';
import { Typography, Spin, Alert, Card } from 'antd';
import { useSelector } from 'react-redux';
import { SelectorState } from '../../redux/reducers/authReducer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ShowProperty.css'; // Importação do arquivo CSS

const { Title, Paragraph } = Typography;

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState({
    address: '',
    description: '',
    image: [''],
    title: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token: string | undefined = useSelector((state: SelectorState) => state.auth?.token) ?? undefined;

  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await new propertyAPI(token).show(id);
        setProperty(data.property);
        setLoading(false);
      } catch (error) {
        setError(errorHandler(error));
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id, token]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" />;

  return (
    <div className="container"> {/* Classe para estilização */}
      <Title level={2} className="title">{property.title}</Title> {/* Classe para estilização */}
      <Card className="card"> {/* Classe para estilização */}
        {property.image.length === 1 ? (
          <img src={property.image[0]} alt={`Image 1`} className="image" />
        ) : (
          <Slider dots autoplay>
            {property.image.map((imageUrl, index) => (
              <div key={index}>
                <img src={imageUrl} alt={`Image ${index + 1}`} className="image" /> {/* Classe para estilização */}
              </div>
            ))}
          </Slider>
        )}
      </Card>
      <Paragraph className="description">{property.description}</Paragraph> {/* Classe para estilização */}
    </div>
  );
}

export default PropertyDetails;
