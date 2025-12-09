import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Payment {
  id: string;
  service: string;
  category: string;
  amount: number;
  date: string;
  status: 'active' | 'inactive';
}

const mockPayments: Payment[] = [
  { id: '1', service: 'AWS EC2', category: 'Серверы', amount: 15000, date: '2024-12-09', status: 'active' },
  { id: '2', service: 'Slack', category: 'Коммуникации', amount: 8000, date: '2024-12-08', status: 'active' },
  { id: '3', service: 'CloudFlare', category: 'Веб-сайты', amount: 5000, date: '2024-12-07', status: 'active' },
  { id: '4', service: 'Norton Security', category: 'Безопасность', amount: 3000, date: '2024-12-06', status: 'inactive' },
];

const chartData = [
  { name: 'Серверы', value: 15000 },
  { name: 'Коммуникации', value: 8000 },
  { name: 'Веб-сайты', value: 5000 },
  { name: 'Безопасность', value: 3000 },
];

const pieData = [
  { name: 'Серверы', value: 15000, color: '#7551e9' },
  { name: 'Коммуникации', value: 8000, color: '#3965ff' },
  { name: 'Веб-сайты', value: 5000, color: '#ffb547' },
  { name: 'Безопасность', value: 3000, color: '#01b574' },
];

const Index = () => {
  const [payments] = useState<Payment[]>(mockPayments);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalExpenses = payments.reduce((sum, p) => sum + p.amount, 0);
  const serverExpenses = payments.filter(p => p.category === 'Серверы').reduce((sum, p) => sum + p.amount, 0);
  const commExpenses = payments.filter(p => p.category === 'Коммуникации').reduce((sum, p) => sum + p.amount, 0);
  const webExpenses = payments.filter(p => p.category === 'Веб-сайты').reduce((sum, p) => sum + p.amount, 0);
  const secExpenses = payments.filter(p => p.category === 'Безопасность').reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(p => 
    p.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-success text-success-foreground">Активен</Badge>
    ) : (
      <Badge variant="secondary">Неактивен</Badge>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-screen">
        <div className="p-5 border-b border-sidebar-border">
          <a href="#" className="flex items-center gap-3 text-sidebar-foreground">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
            <span className="font-bold text-lg">Vision UI</span>
          </a>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon name="Home" size={20} />
                <span>Дашборд</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'payments'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon name="CreditCard" size={20} />
                <span>Платежи</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'services'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon name="Package" size={20} />
                <span>Сервисы</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 ml-64">
        <header className="bg-card/50 backdrop-blur-xl border-b border-border px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="relative max-w-md flex-1">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Поиск сервисов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 bg-card border-input"
              />
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-card border border-border">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                А
              </div>
              <div>
                <div className="text-sm font-semibold">Администратор</div>
                <div className="text-xs text-muted-foreground">Администратор</div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="border-0 shadow-xl bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Общие IT Расходы</CardTitle>
                    <CardDescription>Все время</CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="Server" size={24} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">{totalExpenses.toLocaleString('ru-RU')} ₽</div>
                <p className="text-sm text-muted-foreground mt-1">Начните добавлять платежи</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Серверная Инфраструктура</CardTitle>
                    <CardDescription>Расходы на серверы</CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Icon name="Database" size={24} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">{serverExpenses.toLocaleString('ru-RU')} ₽</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalExpenses > 0 ? `${((serverExpenses / totalExpenses) * 100).toFixed(0)}%` : '0%'} от общего бюджета
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Всего Платежей</CardTitle>
                    <CardDescription>История операций</CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Icon name="Package" size={24} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">{payments.length}</div>
                <p className="text-sm text-muted-foreground mt-1">платежей за все время</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 animate-slide-up">
            <Card className="border-0 shadow-lg bg-card hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="Server" size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{serverExpenses.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-sm text-muted-foreground">Серверы</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Icon name="MessageSquare" size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{commExpenses.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-sm text-muted-foreground">Коммуникации</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Icon name="Globe" size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{webExpenses.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-sm text-muted-foreground">Веб-сайты</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                    <Icon name="Shield" size={22} />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{secExpenses.toLocaleString('ru-RU')} ₽</div>
                    <div className="text-sm text-muted-foreground">Безопасность</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
            <Card className="border-0 shadow-xl bg-card">
              <CardHeader>
                <CardTitle>IT Расходы по Категориям</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieData[index].color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-card">
              <CardHeader>
                <CardTitle>Распределение Затрат</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl bg-card animate-fade-in">
            <CardHeader>
              <CardTitle>IT Сервисы и Расходы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-sm font-bold text-muted-foreground">Сервис</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-muted-foreground">Категория</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-muted-foreground">Сумма (₽)</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-muted-foreground">Дата</th>
                      <th className="text-left py-4 px-4 text-sm font-bold text-muted-foreground">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4 font-medium">{payment.service}</td>
                          <td className="py-4 px-4 text-muted-foreground">{payment.category}</td>
                          <td className="py-4 px-4 font-semibold">{payment.amount.toLocaleString('ru-RU')}</td>
                          <td className="py-4 px-4 text-muted-foreground">{payment.date}</td>
                          <td className="py-4 px-4">{getStatusBadge(payment.status)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <Icon name="CreditCard" size={48} className="text-muted-foreground opacity-50" />
                            <div>
                              <div className="text-lg font-semibold mb-1">Платежи не найдены</div>
                              <div className="text-sm text-muted-foreground">Добавьте первый платеж</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
