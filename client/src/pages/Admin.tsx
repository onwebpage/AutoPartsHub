import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Settings, 
  Users, 
  Package, 
  Activity, 
  Globe, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Shield, 
  Zap,
  AlertCircle,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductDialog } from "@/components/ProductDialog";

const stats = [
  { label: "Active Sessions", value: "24", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "up" },
  { label: "Page Views (24h)", value: "1,284", change: "+18%", icon: Globe, color: "text-purple-500", bg: "bg-purple-500/10", trend: "up" },
  { label: "Avg. Session", value: "4m 32s", change: "-2%", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10", trend: "down" },
  { label: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "up" },
];

const recentActivity = [
  { id: 1, event: "New inquiry for BMW Engine", user: "Anonymous", time: "2 mins ago", status: "new" },
  { id: 2, event: "Inventory updated: Ford Trans", user: "Admin", time: "15 mins ago", status: "success" },
  { id: 3, event: "Price change: Chevy V8", user: "Admin", time: "1 hour ago", status: "info" },
  { id: 4, event: "System Backup Completed", user: "System", time: "2 hours ago", status: "success" },
];

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"inventory" | "monitoring" | "security">("inventory");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const filteredParts = products.filter(part => 
    part.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    part.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.partId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-white/10 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">RAP Admin</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            className={`justify-start ${activeTab === 'inventory' ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package className="mr-2 h-4 w-4" />
            Inventory
          </Button>
          <Button 
            variant="ghost" 
            className={`justify-start ${activeTab === 'monitoring' ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            onClick={() => setActiveTab('monitoring')}
          >
            <Activity className="mr-2 h-4 w-4" />
            Monitoring
          </Button>
          <Button 
            variant="ghost" 
            className={`justify-start ${activeTab === 'security' ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield className="mr-2 h-4 w-4" />
            Security
          </Button>
          <div className="h-px bg-white/5 my-2" />
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white hover:bg-white/5">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="mt-auto p-4 bg-zinc-950 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
            <div>
              <div className="text-xs font-medium text-white">Admin User</div>
              <div className="text-[10px] text-zinc-500">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {activeTab === 'inventory' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-display font-bold text-white tracking-tight">Inventory Management</h1>
                  <p className="text-zinc-400">View customer requests and manage part inventory.</p>
                </div>
                <Button 
                  onClick={handleAddProduct}
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 shadow-lg shadow-primary/20"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Part
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input 
                    placeholder="Search by ID, Make, or Model..." 
                    className="pl-10 bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 w-full sm:w-auto rounded-xl">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </div>

              {isLoading ? (
                <div className="text-center text-zinc-400 py-12">Loading products...</div>
              ) : (
                <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                  <Table>
                    <TableHeader className="bg-zinc-950">
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-zinc-400 font-medium">Part ID</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Vehicle</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Part Type</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Price</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Status</TableHead>
                        <TableHead className="text-zinc-400 font-medium">Customer</TableHead>
                        <TableHead className="text-zinc-400 font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredParts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-zinc-500 py-12">
                            No products found. Add your first product to get started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredParts.map((part) => (
                          <TableRow key={part.id} className="border-white/10 hover:bg-white/5 transition-colors group">
                            <TableCell className="font-medium text-white">{part.partId}</TableCell>
                            <TableCell>
                              <div className="text-white font-medium">{part.year} {part.make} {part.model}</div>
                              <div className="text-xs text-zinc-500">{part.details}</div>
                            </TableCell>
                            <TableCell className="text-zinc-300">{part.type}</TableCell>
                            <TableCell className="text-zinc-300">${part.price.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`rounded-full px-3 py-0.5 text-[10px] uppercase tracking-wider
                                  ${part.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                  ${part.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                                  ${part.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                  ${part.status === 'Out of Stock' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                                `}
                              >
                                {part.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-zinc-400">{part.customer}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white group-hover:bg-white/5 rounded-full transition-all">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-zinc-900 border-white/10">
                                  <DropdownMenuItem 
                                    onClick={() => handleEditProduct(part)}
                                    className="text-white hover:bg-white/5 cursor-pointer"
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteProduct(part.id)}
                                    className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-display font-bold text-white tracking-tight">Site Performance</h1>
                  <p className="text-zinc-400">Real-time metrics and visitor analytics.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">System Online</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <Card key={i} className="bg-zinc-900 border-white/5 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {stat.change}
                          {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-zinc-500">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-zinc-900 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-white font-display flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      Live Traffic Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'new' ? 'bg-primary' : 
                              activity.status === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                            }`} />
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-primary transition-colors cursor-default">{activity.event}</div>
                              <div className="text-xs text-zinc-500 flex items-center gap-2">
                                <Users className="w-3 h-3" /> {activity.user}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-zinc-600 font-mono">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-6 text-zinc-400 hover:text-white hover:bg-white/5 text-xs">
                      View Full Audit Log
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-white font-display">Server Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">CPU Usage</span>
                        <span className="text-emerald-400 font-mono">12%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[12%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Memory</span>
                        <span className="text-emerald-400 font-mono">42%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[42%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Database Load</span>
                        <span className="text-amber-400 font-mono">24%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[24%]" />
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 mt-4">
                      <div className="flex gap-3">
                        <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
                        <div className="text-[11px] text-zinc-400 leading-relaxed">
                          Next scheduled maintenance window is <span className="text-white font-medium">Sunday at 02:00 AM EST</span>.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div>
                  <h1 className="text-3xl font-display font-bold text-white tracking-tight">Security & Access</h1>
                  <p className="text-zinc-400">Manage permissions and view security logs.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-zinc-900 border-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg text-white font-display flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Admin Access Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">Two-Factor Auth</div>
                          <div className="text-xs text-zinc-500">Enhanced account security</div>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Enabled</Badge>
                      </div>
                      <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex items-center justify-between opacity-50">
                        <div>
                          <div className="text-sm font-medium text-white">IP Whitelisting</div>
                          <div className="text-xs text-zinc-500">Restrict access by location</div>
                        </div>
                        <Badge variant="outline" className="text-zinc-500 border-zinc-500/20">Inactive</Badge>
                      </div>
                      <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs py-5">
                        Update Security Policy
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900 border-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg text-white font-display">Recent Logins</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { ip: "192.168.1.1", loc: "New York, US", time: "Just now" },
                        { ip: "192.168.1.45", loc: "London, UK", time: "3h ago" },
                        { ip: "10.0.0.12", loc: "Local Network", time: "12h ago" },
                      ].map((login, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-0">
                          <div>
                            <div className="text-zinc-300 font-mono">{login.ip}</div>
                            <div className="text-zinc-600">{login.loc}</div>
                          </div>
                          <div className="text-zinc-500">{login.time}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
            </div>
          )}

        </div>
      </main>

      <ProductDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        product={editingProduct}
      />
    </div>
  );
}
