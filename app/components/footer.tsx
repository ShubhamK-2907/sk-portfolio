export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 pt-5 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shubham Kumar Sahoo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}