import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from '../components/Loader';

describe('Loader component', () => {
  test('renders Loader component with Spinner', () => {
    render(<Loader />);

    const spinnerElement = screen.getByRole('status');
    expect(spinnerElement).toBeInTheDocument();

    const loadingText = screen.getByText('Cargando...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('visually-hidden'); 
  });
});
