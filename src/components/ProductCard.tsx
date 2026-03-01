import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant) return;
    
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });
    
    toast.success('Added to cart', {
      description: node.title,
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem]">
            {node.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-display text-lg font-semibold text-primary">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </p>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="gap-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
