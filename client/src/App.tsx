import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import Inventory from "@/pages/Inventory";
import ProductDetails from "@/pages/ProductDetails";
import About from "@/pages/About";
import RefundPolicy from "@/pages/RefundPolicy";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Simple route protection mockup
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  
  if (!isAdmin) {
    return <Redirect to="/admin-login" />;
  }

  return <Component {...rest} />;
};

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/admin">
            {() => <ProtectedRoute component={Admin} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
