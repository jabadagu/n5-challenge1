import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import addProduct from '../hooks/usePostProducts';

const mock = new MockAdapter(axios);

describe('addProduct', () => {
  it('should add product successfully', async () => {
    const endpoint = 'products';
    const newProduct = {
      name: 'Nuevo Producto',
      image: 'https://via.placeholder.com/100',
      amount: 5,
      price: 100,
    };
    const responseProduct = [
        { id: '1', name: 'Leche', image: '...', amount: 2, price: 75000 },
        { id: '2', name: 'Cereal', image: '...', amount: 3, price: 85300 },
      ];

    mock.onPost(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}`, newProduct).reply(201, responseProduct);

    const result = await addProduct(endpoint, newProduct);
    expect(result).toEqual(responseProduct);
  });

  it('should handle errors', async () => {
    const endpoint = 'products';
    const newProduct = {
      name: 'Nuevo Producto',
      image: '...',
      amount: 5,
      price: 100,
    };

    mock.onPost(`${process.env.REACT_APP_URL_API}${endpoint}`).reply(500);

    await expect(addProduct(endpoint, newProduct)).rejects.toThrow();
  });
});
