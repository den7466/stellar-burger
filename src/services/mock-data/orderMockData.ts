import { TOrderState } from '../slices/orderSlice';

export const orderInitialState: TOrderState = {
  ordersHistory: [
    {
      _id: '667039af856777001bb1b93a',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-06-17T13:27:11.127Z',
      updatedAt: '2024-06-17T13:27:11.507Z',
      number: 43052
    }
  ],
  successedOrder: {
    success: true,
    name: 'Флюоресцентный био-марсианский бургер',
    order: {
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      _id: '668912f8856777001bb20247',
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-07-06T09:48:40.197Z',
      updatedAt: '2024-07-06T09:48:40.736Z',
      number: 45046
    }
  },
  orderInfoData: {
    success: true,
    orders: [
      {
        _id: '668939c3856777001bb2029d',
        ingredients: [
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный бессмертный бургер',
        createdAt: '2024-07-06T12:34:11.958Z',
        updatedAt: '2024-07-06T12:34:12.410Z',
        number: 45054
      }
    ]
  },
  orderRequest: false,
  orderError: null
};

export const responceGetOrder = [
  {
    _id: '667039af856777001bb1b93a',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-06-17T13:27:11.127Z',
    updatedAt: '2024-06-17T13:27:11.507Z',
    number: 43052
  }
];

export const responcePostOrder = {
  success: true,
  name: 'Флюоресцентный био-марсианский бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '668912f8856777001bb20247',
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-07-06T09:48:40.197Z',
    updatedAt: '2024-07-06T09:48:40.736Z',
    number: 45046
  }
};

export const responceGetOrderByNumber = {
  success: true,
  orders: [
    {
      _id: '668912f8856777001bb20247',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '666c572897ede0001d070a36',
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-07-06T09:48:40.197Z',
      updatedAt: '2024-07-06T09:48:40.736Z',
      number: 45046,
      __v: 0
    }
  ]
};
