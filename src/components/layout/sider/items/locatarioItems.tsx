import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuItem, getItem } from './defaultItems';

const locatarioItems: MenuItem[] = [
  getItem('Option 1', '/', <HomeOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

export default locatarioItems 