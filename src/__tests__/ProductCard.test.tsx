import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '@/components/catalog/ProductCard';
import { useCartStore } from '@/state/useCartStore';

const product = {
  id: 't1', title: 'Test Product', category: 'Electronics', price: 10, images: ['https://picsum.photos/seed/t1/400/300'], description: 'desc', rating: 4.2, stock: 10
};

describe('ProductCard', () => {
  it('renders title and add to cart', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product as any} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /add test product to cart/i });
    fireEvent.click(btn);
    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].product.id).toBe('t1');
  });
});
