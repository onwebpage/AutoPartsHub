import { useState } from "react";
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
import { Search, Plus, Filter, MoreHorizontal, Settings, Users, Package } from "lucide-react";

// Mock Data
const mockParts = [
  { id: "RAP-1001", type: "Engine", year: 2018, make: "Ford", model: "F-150", details: "5.0L V8", price: "$2,400", status: "In Stock", customer: "John Doe" },
  { id: "RAP-1002", type: "Transmission", year: 2020, make: "Toyota", model: "Camry", details: "8-Speed Auto", price: "$1,200", status: "Processing", customer: "Sarah Smith" },
  { id: "RAP-1003", type: "Engine", year: 2015, make: "Chevrolet", model: "Silverado", details: "5.3L V8", price: "$1,850", status: "Shipped", customer: "Mike Johnson" },
  { id: "RAP-1004", type: "Axle", year: 2019, make: "Jeep", model: "Wrangler", details: "Rear Axle Assembly", price: "$950", status: "In Stock", customer: "Pending" },
  { id: "RAP-1005", type: "Engine", year: 2022, make: "Honda", model: "Accord", details: "2.0L Turbo", price: "$3,100", status: "In Stock", customer: "Pending" },
];

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParts = mockParts.filter(part => 
    part.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    part.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      
      {/* Sidebar Mockup */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-white/10 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-white">RAP Admin</span>
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">v1.0</Badge>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start text-white bg-white/5" data-testid="nav-admin-inventory">
            <Package className="mr-2 h-4 w-4" />
            Inventory & Requests
          </Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white hover:bg-white/5" data-testid="nav-admin-customers">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>
          <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white hover:bg-white/5" data-testid="nav-admin-settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white">Parts Management</h1>
              <p className="text-zinc-400">View customer requests and manage inventory.</p>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90" data-testid="button-add-part">
              <Plus className="mr-2 h-4 w-4" /> Add New Part
            </Button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/5">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Search by ID, Make, or Model..." 
                className="pl-10 bg-background border-white/10 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-admin-search"
              />
            </div>
            <Button variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 w-full sm:w-auto" data-testid="button-admin-filter">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Table */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
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
                {filteredParts.map((part) => (
                  <TableRow key={part.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-white">{part.id}</TableCell>
                    <TableCell>
                      <div className="text-white">{part.year} {part.make} {part.model}</div>
                      <div className="text-xs text-zinc-500">{part.details}</div>
                    </TableCell>
                    <TableCell className="text-zinc-300">{part.type}</TableCell>
                    <TableCell className="text-zinc-300">{part.price}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${part.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                          ${part.status === 'Processing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                          ${part.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                        `}
                      >
                        {part.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-400">{part.customer}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" data-testid={`button-action-${part.id}`}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredParts.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                No parts found matching your search.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
