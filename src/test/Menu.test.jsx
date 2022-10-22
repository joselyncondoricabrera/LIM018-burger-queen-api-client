import fecth from 'node-fetch';
import { getProducts } from '../Requests/requestApi';

jest.mock('node-fetch', () => jest.fn());

describe('getProducts', () => {
  it('Debería ser una función', () => {
    expect(typeof getProducts).toBe('function');
  });
  it('Debería retornar datos de los productos', () => {
    // eslint-disable-next-line max-len
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';
    const json = {};
    // const resp = { json, status: 200 };
    // console.log('hola');
    fecth.mockResolvedValue(json);
    // console.log(getProducts());
    getProducts(token)
      .then((res) => {
        console.log(res);
        expect(res).toEqual('hola');
      })
      .catch((e) => console.log(e));
  });
});
