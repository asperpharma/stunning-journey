import { CartDrawer } from './CartDrawer';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-foreground">
            Asper Beauty
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Products
          </a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
