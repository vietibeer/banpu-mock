import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'my-task',
    name: 'Agreement request',
    zh: {
      name: '仪表盘'
    },
    'pt-br': {
      name: 'Agreement request'
    },
    // route: '/myTask',
  },
  // {
  //   id: '5',
  //   breadcrumbParentId: '1',
  //   name: 'Agreement request',
  //   zh: {
  //     name: 'Agreement request'
  //   },
  //   'pt-br': {
  //     name: 'Graficos'
  //   },
  //   icon: 'code-o',
    
  // },
  {
    id: '51',
    breadcrumbParentId: '1',
    menuParentId: '1',
    name: 'My task',
    zh: {
      name: 'My task'
    },
    'pt-br': {
      name: 'My task'
    },
    icon: 'my-task',
    // route: '/myTask',
    route: '/banpu-mock',
    number: '10',
    color: 'rgb(54,138,235)'
  },
  {
    id: '52',
    breadcrumbParentId: '1',
    menuParentId: '1',
    name: 'All document',
    zh: {
      name: 'All document'
    },
    'pt-br': {
      name: 'All document'
    },
    icon: 'all-document',
    route: '/chart/highCharts',
    number: '123',
    color: 'rgb(54,138,235)'
  },
  {
    id: '53',
    breadcrumbParentId: '1',
    menuParentId: '1',
    name: 'Draff',
    zh: {
      name: 'Draff'
    },
    'pt-br': {
      name: 'Draff'
    },
    icon: 'draw',
    route: '/test',
    number: '50',
    color: 'rgb(54,138,235)'
  },
  {
    id: '54',
    breadcrumbParentId: '1',
    menuParentId: '1',
    name: 'Waiting to verify',
    zh: {
      name: 'Waiting to verify'
    },
    'pt-br': {
      name: 'Waiting to verify'
    },
    icon: 'chart-outline',
    route: '/test',
    number: '50',
    color: 'rgb(255,153,0)'
  },
  {
    id: '6',
    breadcrumbParentId: '1',
    name: 'PGA',
    zh: {
      name: 'PGA'
    },
    'pt-br': {
      name: 'PGA'
    },
    style: 'bold'
  },
  {
    id: '61',
    breadcrumbParentId: '6',
    menuParentId: '6',
    name: 'My task',
    zh: {
      name: 'My task'
    },
    'pt-br': {
      name: 'My task'
    },
    icon: 'my-task',
    route: '/test',
    number: '10',
    color: 'rgb(54,138,235)'
  },
  {
    id: '62',
    breadcrumbParentId: '6',
    menuParentId: '6',
    name: 'All document',
    zh: {
      name: 'All document'
    },
    'pt-br': {
      name: 'All document'
    },
    icon: 'all-document',
    route: '/chart/highCharts',
    number: '123',
    color: 'rgb(54,138,235)'
  },
  {
    id: '63',
    breadcrumbParentId: '6',
    menuParentId: '6',
    name: 'Draff',
    zh: {
      name: 'Draff'
    },
    'pt-br': {
      name: 'Draff'
    },
    icon: 'draw',
    route: '/test',
    number: '50',
    color: 'rgb(54,138,235)'
  },
  {
    id: '64',
    breadcrumbParentId: '6',
    menuParentId: '6',
    name: 'Waiting to verify',
    zh: {
      name: 'Waiting to verify'
    },
    'pt-br': {
      name: 'Waiting to verify'
    },
    icon: 'chart-outline',
    route: '/test',
    number: '50',
    color: 'rgb(255,153,0)'
  },
  {
    id: '7',
    breadcrumbParentId: '1',
    name: 'POA',
    zh: {
      name: 'POA'
    },
    'pt-br': {
      name: 'POA'
    },
    style: 'bold'
  },
  {
    id: '71',
    breadcrumbParentId: '7',
    menuParentId: '7',
    name: 'My task',
    zh: {
      name: 'My task'
    },
    'pt-br': {
      name: 'My task'
    },
    icon: 'my-task',
    route: '/test',
    number: '10',
    color: 'rgb(54,138,235)'
  },
  {
    id: '72',
    breadcrumbParentId: '7',
    menuParentId: '7',
    name: 'All document',
    zh: {
      name: 'All document'
    },
    'pt-br': {
      name: 'All document'
    },
    icon: 'all-document',
    route: '/chart/highCharts',
    number: '123',
    color: 'rgb(54,138,235)'
  },
  {
    id: '73',
    breadcrumbParentId: '7',
    menuParentId: '7',
    name: 'Draff',
    zh: {
      name: 'Draff'
    },
    'pt-br': {
      name: 'Draff'
    },
    icon: 'draw',
    route: '/test',
    number: '50',
    color: 'rgb(54,138,235)'
  },
  {
    id: '74',
    breadcrumbParentId: '7',
    menuParentId: '7',
    name: 'Waiting to verify',
    zh: {
      name: 'Waiting to verify'
    },
    'pt-br': {
      name: 'Waiting to verify'
    },
    icon: 'chart-outline',
    route: '/test',
    number: '50',
    color: 'rgb(255,153,0)'
  },
  
  {
    id: '8',
    breadcrumbParentId: '1',
    name: 'Configuration',
    zh: {
      name: 'Agreement request'
    },
    'pt-br': {
      name: 'Graficos'
    },
    style: 'bold'
    
  },
  {
    id: '81',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: 'Parent company',
    zh: {
      name: 'Parent company'
    },
    'pt-br': {
      name: 'Parent company'
    },
    icon: 'my-task',
    route: '/test',
  },
  {
    id: '82',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: 'Company',
    zh: {
      name: 'Company'
    },
    'pt-br': {
      name: 'Company'
    },
    icon: 'all-document',
    route: '/chart/highCharts',
  },
  {
    id: '83',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: 'Counterpart',
    zh: {
      name: 'Counterpart'
    },
    'pt-br': {
      name: 'Counterpart'
    },
    icon: 'draw',
    route: '/test',
  },
  {
    id: '84',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: 'Type of agreement',
    zh: {
      name: 'Type of agreement'
    },
    'pt-br': {
      name: 'Type of agreement'
    },
    icon: 'chart-outline',
    route: '/test',
  },
  {
    id: '85',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: 'Attorny',
    zh: {
      name: 'Attorny'
    },
    'pt-br': {
      name: 'Attorny'
    },
    icon: 'chart-outline',
    route: '/test',
  },
  {
    id: '86',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: 'Legal assignment',
    zh: {
      name: 'Legal assignment'
    },
    'pt-br': {
      name: 'Legal assignment'
    },
    icon: 'chart-outline',
    route: '/test',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
