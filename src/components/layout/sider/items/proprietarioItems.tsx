import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuItem, getItem } from './defaultItems';

const proprietarioItems: MenuItem[] = [
  getItem('Imóveis', '/', <HomeOutlined />),
];

export default proprietarioItems 