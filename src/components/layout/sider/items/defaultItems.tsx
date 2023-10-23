import React from 'react'
import type { MenuProps } from 'antd'
import locatarioItems from './locatarioItems'
import {
  HomeOutlined
} from '@ant-design/icons';

export type MenuItem = Required<MenuProps>['items'][number]

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

export const unauthItems: MenuItem[] = [
  getItem('Imóveis Disponíveis', '/', <HomeOutlined />),
  getItem('Teste Dois', '/adubo', <HomeOutlined />)
]

export function getUserPaths (userLevel?: any) {
  console.log({ userLevel })
  if (!userLevel) return unauthItems
  return locatarioItems
}