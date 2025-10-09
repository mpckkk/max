export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card mt-20">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-accent">♥</span> for Max
          </p>
          <p className="text-xs text-muted-foreground">
            © {currentYear} Max the Shiba Inu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
