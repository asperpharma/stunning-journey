import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductGrid() {
  const { data: products, isLoading, error } = useProducts(20);

  if (isLoading) {
    return (
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">
            Our Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">
            Failed to load products. Please try again.
          </p>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground">No products found</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">
          Our Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
