import { render, screen, fireEvent } from '@testing-library/react';
import FiltersSidebar from '@/components/catalog/FiltersSidebar';
import { useCatalogStore } from '@/state/useCatalogStore';

describe('FiltersSidebar', () => {
  it('updates category filter', () => {
    render(<FiltersSidebar />);
    const select = screen.getByLabelText(/category/i);
    fireEvent.change(select, { target: { value: 'Electronics' } });
    expect(useCatalogStore.getState().selectedCategory).toBe('Electronics');
  });
});
