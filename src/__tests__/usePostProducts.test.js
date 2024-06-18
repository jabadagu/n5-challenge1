import Axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import addProduct from '../hooks/usePostProducts';

const mock = new axiosMock(Axios);

describe('addProduct', () => {
  const endpoint = '/products';
  const product = { id: 1, name: 'Product 1', price: 100 };

  beforeEach(() => {
    mock.reset();
  });

  test('successfully adds a product via API', async () => {
    const mockResponse = { message: 'Product added successfully' };
    
    mock.onPost(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, product).reply(200, mockResponse);

    const result = await addProduct(endpoint, product);

    expect(result).toEqual(mockResponse);
  });

  test('handles API errors', async () => {
    mock.onPost(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, product).reply(500);

    await expect(addProduct(endpoint, product)).rejects.toThrow();
  });
});
