import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Wrench, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("isAdmin", "true");
        setLocation("/admin");
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-zinc-950">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
      </div>

      <Card className="w-full max-w-md glass-panel border-white/10 relative z-10 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto bg-primary p-3 rounded-xl w-fit group-hover:scale-105 transition-transform">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-display font-bold text-white uppercase tracking-tight">
              Admin <span className="text-primary">Login</span>
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your credentials to access the RAP management portal.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-zinc-900/50 border-white/10 text-white focus:ring-primary"
                required
                data-testid="input-login-username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900/50 border-white/10 text-white focus:ring-primary"
                required
                data-testid="input-login-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 mt-2"
              disabled={loading}
              data-testid="button-login-submit"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => setLocation("/")}
              className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center justify-center mx-auto gap-2"
            >
              <Wrench className="w-4 h-4" />
              Return to Public Site
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
