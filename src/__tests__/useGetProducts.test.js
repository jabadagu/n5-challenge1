import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getProducts from '../hooks/useGetProducts';

const mock = new MockAdapter(axios);

describe('getProducts', () => {
  it('should fetch products successfully', async () => {
    const endpoint = 'products';
    const mockResponse = [
      { id: '1', name: 'Leche', image: '...', amount: 2, price: 75000 },
      { id: '2', name: 'Cereal', image: '...', amount: 3, price: 85300 },
    ];

    mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`).reply(200, mockResponse);

    const result = await getProducts(endpoint);
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors', async () => {
    const endpoint = 'products';

    mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`).reply(500);

    await expect(getProducts(endpoint)).rejects.toThrow();
  });
});
