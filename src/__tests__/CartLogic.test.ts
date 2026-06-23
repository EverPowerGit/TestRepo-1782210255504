import { useCartStore } from '@/state/useCartStore';

const p = { id: 'x', title: 'X', category: 'Electronics', price: 5, images: [''], description: '', rating: 4, stock: 10 } as any;

describe('Cart logic', () => {
  beforeEach(() => { useCartStore.setState({ items: [] }); });
  it('adds, updates, removes items', () => {
    const s = useCartStore.getState();
    s.addItem(p, 2);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    s.updateQuantity('x', 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
    s.removeItem('x');
    expect(useCartStore.getState().items.length).toBe(0);
  });
});
