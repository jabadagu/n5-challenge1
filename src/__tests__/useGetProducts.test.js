import Axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import getProducts from '../hooks/useGetProducts';

const mock = new axiosMock(Axios);

describe('getProducts', () => {
  const endpoint = '/products';

  beforeEach(() => {
    mock.reset();
  });

  test('successfully fetches data from API', async () => {
    const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    
    mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`).reply(200, mockData);

    const result = await getProducts(endpoint);

    expect(result).toEqual(mockData);
  });

  test('handles API errors', async () => {
    mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`).reply(500);

    await expect(getProducts(endpoint)).rejects.toThrow();
  });
});
