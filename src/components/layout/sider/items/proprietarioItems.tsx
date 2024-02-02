import {
  DesktopOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { MenuItem, getItem } from './defaultItems';

const proprietarioItems: MenuItem[] = [
  getItem('Imóveis', '/property/list', <HomeOutlined />),
  getItem('Cadastrar imóvel', '/property/register', <DesktopOutlined />),
];

export default proprietarioItems 