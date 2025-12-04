import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Package,
  Calendar,
  BarChart3
} from 'lucide-react';

export function AdminArea() {
  const orders = [
    { id: 'ORD-2024-145', customer: 'Cliente A', amount: '€ 2,450', status: 'completed', date: '15/11/2024' },
    { id: 'ORD-2024-146', customer: 'Cliente B', amount: '€ 1,850', status: 'in_progress', date: '18/11/2024' },
    { id: 'ORD-2024-147', customer: 'Cliente C', amount: '€ 3,200', status: 'pending', date: '20/11/2024' },
  ];

  const invoices = [
    { id: 'FT-2024-089', customer: 'Cliente A', amount: '€ 2,450', status: 'paid', date: '16/11/2024' },
    { id: 'FT-2024-090', customer: 'Cliente D', amount: '€ 1,750', status: 'pending', date: '19/11/2024' },
    { id: 'FT-2024-091', customer: 'Cliente E', amount: '€ 2,100', status: 'overdue', date: '10/11/2024' },
  ];

  const materialUsage = [
    { material: 'Vernice Rossa RAL 3020', quantity: '2.5 L', cost: '€ 145' },
    { material: 'Batterie 500Wh', quantity: '8 pz', cost: '€ 1,920' },
    { material: 'Catene premium', quantity: '12 pz', cost: '€ 360' },
    { material: 'Display LCD', quantity: '6 pz', cost: '€ 540' },
  ];

  const monthlyStats = [
    { month: 'Luglio', revenue: 28500, costs: 12000, orders: 12 },
    { month: 'Agosto', revenue: 32000, costs: 13500, orders: 15 },
    { month: 'Settembre', revenue: 35500, costs: 14200, orders: 18 },
    { month: 'Ottobre', revenue: 38200, costs: 15100, orders: 20 },
    { month: 'Novembre', revenue: 41000, costs: 16000, orders: 22 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-gray-900 mb-1">Amministrazione & Contabilità</h1>
        <p className="text-gray-600">Gestione finanziaria e documenti</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">€ 41,000</div>
          <div className="text-sm text-gray-600">Fatturato Mensile</div>
          <div className="text-xs text-green-600 mt-1">+7.3% vs mese scorso</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#52a8b9]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#52a8b9]" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">22</div>
          <div className="text-sm text-gray-600">Ordini Questo Mese</div>
          <div className="text-xs text-gray-600 mt-1">2 ordini questa settimana</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">€ 16,000</div>
          <div className="text-sm text-gray-600">Costi Produzione</div>
          <div className="text-xs text-gray-600 mt-1">Materiali e manodopera</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl text-gray-900 mb-1">€ 25,000</div>
          <div className="text-sm text-gray-600">Margine Netto</div>
          <div className="text-xs text-blue-600 mt-1">61% margine</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Ordini</TabsTrigger>
          <TabsTrigger value="invoices">Fatture</TabsTrigger>
          <TabsTrigger value="materials">Materiali</TabsTrigger>
          <TabsTrigger value="stats">Statistiche</TabsTrigger>
        </TabsList>

        {/* Orders */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Riepilogo Ordini</h3>
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="text-gray-900 mb-1">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.customer}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 mb-2">{order.amount}</div>
                    <Badge
                      variant={
                        order.status === 'completed'
                          ? 'default'
                          : order.status === 'in_progress'
                          ? 'secondary'
                          : 'outline'
                      }
                      className={order.status === 'completed' ? 'bg-green-600' : ''}
                    >
                      {order.status === 'completed'
                        ? 'Completato'
                        : order.status === 'in_progress'
                        ? 'In Corso'
                        : 'In Attesa'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Fatture & Documenti</h3>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-gray-900 mb-1">{invoice.id}</div>
                      <div className="text-sm text-gray-600">{invoice.customer}</div>
                      <div className="text-xs text-gray-500 mt-1">{invoice.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 mb-2">{invoice.amount}</div>
                    <Badge
                      variant={
                        invoice.status === 'paid'
                          ? 'default'
                          : invoice.status === 'overdue'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={invoice.status === 'paid' ? 'bg-green-600' : ''}
                    >
                      {invoice.status === 'paid'
                        ? 'Pagata'
                        : invoice.status === 'overdue'
                        ? 'Scaduta'
                        : 'In Attesa'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Materials */}
        <TabsContent value="materials" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Scarico Materiali (Questo Mese)</h3>
            <div className="space-y-3">
              {materialUsage.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-gray-900 mb-1">{item.material}</div>
                      <div className="text-sm text-gray-600">{item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-gray-900">{item.cost}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#52a8b9]/10 border border-[#52a8b9]/20">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Totale Materiali</span>
                <span className="text-gray-900">€ 2,965</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Statistics */}
        <TabsContent value="stats" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Statistiche Mensili</h3>
            </div>

            <div className="space-y-4">
              {monthlyStats.map((stat, index) => {
                const profit = stat.revenue - stat.costs;
                const margin = ((profit / stat.revenue) * 100).toFixed(1);

                return (
                  <div key={index} className="p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-900">{stat.month}</span>
                      <Badge variant="secondary">{stat.orders} ordini</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Fatturato</div>
                        <div className="text-gray-900">€ {stat.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Costi</div>
                        <div className="text-gray-900">€ {stat.costs.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Utile</div>
                        <div className="text-green-600">€ {profit.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-600">
                      Margine: {margin}%
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Riepilogo Ultimi 5 Mesi</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-green-50">
                <div className="text-sm text-gray-600 mb-1">Fatturato Totale</div>
                <div className="text-2xl text-gray-900">€ 175,200</div>
              </div>
              <div className="p-4 rounded-xl bg-orange-50">
                <div className="text-sm text-gray-600 mb-1">Costi Totali</div>
                <div className="text-2xl text-gray-900">€ 70,800</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50">
                <div className="text-sm text-gray-600 mb-1">Utile Netto</div>
                <div className="text-2xl text-gray-900">€ 104,400</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-50">
                <div className="text-sm text-gray-600 mb-1">Ordini Totali</div>
                <div className="text-2xl text-gray-900">87</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
