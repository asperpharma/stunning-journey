import { useParams } from "react-router-dom";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useProductByHandle(handle || "");
  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-destructive mb-4">Product not found</p>
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const currentImage = images[selectedImageIndex]?.node;
  const variant = product.variants?.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: product.title,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              {currentImage
                ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.altText || product.title}
                    className="h-full w-full object-cover"
                  />
                )
                : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      index === selectedImageIndex
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
                {product.title}
              </h1>
              <p className="font-display text-2xl font-semibold text-primary">
                {product.priceRange?.minVariantPrice?.currencyCode}{" "}
                {parseFloat(product.priceRange?.minVariantPrice?.amount || "0")
                  .toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div className="prose prose-sm text-muted-foreground">
                <p>{product.description}</p>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={cartLoading || !variant?.availableForSale}
              className="w-full md:w-auto"
            >
              {cartLoading
                ? <Loader2 className="h-5 w-5 animate-spin mr-2" />
                : <ShoppingBag className="h-5 w-5 mr-2" />}
              Add to Cart
            </Button>

            {variant && !variant.availableForSale && (
              <p className="text-sm text-destructive">Out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
