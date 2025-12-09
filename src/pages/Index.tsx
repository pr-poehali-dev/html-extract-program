import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Payment {
  id: string;
  company: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  category: string;
}

const mockPayments: Payment[] = [
  { id: '1', company: 'ООО "Техносервис"', amount: 125000, status: 'completed', date: '2024-12-09', category: 'Оборудование' },
  { id: '2', company: 'ИП Иванов', amount: 45000, status: 'pending', date: '2024-12-08', category: 'Услуги' },
  { id: '3', company: 'АО "Стройматериалы"', amount: 320000, status: 'completed', date: '2024-12-07', category: 'Материалы' },
  { id: '4', company: 'ООО "Логистика Плюс"', amount: 78000, status: 'failed', date: '2024-12-06', category: 'Доставка' },
  { id: '5', company: 'ООО "Консалтинг"', amount: 150000, status: 'completed', date: '2024-12-05', category: 'Услуги' },
  { id: '6', company: 'ИП Петрова', amount: 32000, status: 'pending', date: '2024-12-04', category: 'Реклама' },
];

const chartData = [
  { name: 'Янв', income: 450000, expense: 320000 },
  { name: 'Фев', income: 520000, expense: 380000 },
  { name: 'Мар', income: 480000, expense: 350000 },
  { name: 'Апр', income: 610000, expense: 420000 },
  { name: 'Май', income: 580000, expense: 390000 },
  { name: 'Июн', income: 650000, expense: 450000 },
];

const pieData = [
  { name: 'Оборудование', value: 125000, color: '#9b87f5' },
  { name: 'Услуги', value: 195000, color: '#D946EF' },
  { name: 'Материалы', value: 320000, color: '#F97316' },
  { name: 'Доставка', value: 78000, color: '#0EA5E9' },
  { name: 'Реклама', value: 32000, color: '#22C55E' },
];

const Index = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filter, setFilter] = useState<string>('all');

  const totalIncome = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalFailed = payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.status === filter);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: string; label: string }> = {
      completed: { variant: 'default', icon: 'CheckCircle', label: 'Выполнен' },
      pending: { variant: 'secondary', icon: 'Clock', label: 'В обработке' },
      failed: { variant: 'destructive', icon: 'XCircle', label: 'Отклонен' },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon name={config.icon} size={14} />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/30 dark:from-background dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="container mx-auto p-6 space-y-8">
        <header className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Финансовый дашборд
            </h1>
            <p className="text-muted-foreground mt-2">Управление платежами и операциями</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gradient-purple text-white hover:opacity-90 transition-all hover-lift shadow-lg">
                <Icon name="Plus" className="mr-2" size={20} />
                Новый платеж
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Создать платеж</DialogTitle>
                <DialogDescription>Заполните данные для нового платежа</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" placeholder="ООО Компания" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Сумма (₽)</Label>
                  <Input id="amount" type="number" placeholder="100000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Категория</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Оборудование</SelectItem>
                      <SelectItem value="services">Услуги</SelectItem>
                      <SelectItem value="materials">Материалы</SelectItem>
                      <SelectItem value="delivery">Доставка</SelectItem>
                      <SelectItem value="ads">Реклама</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full gradient-purple text-white">Создать платеж</Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <Card className="glass-card hover-lift border-0 shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Завершенные</CardTitle>
                <div className="w-10 h-10 rounded-full gradient-success flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalIncome.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground mt-2">+12.5% за месяц</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift border-0 shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">В обработке</CardTitle>
                <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPending.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground mt-2">2 платежа</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift border-0 shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Отклоненные</CardTitle>
                <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center">
                  <Icon name="AlertCircle" size={20} className="text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalFailed.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground mt-2">1 платеж</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="animate-scale-in">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8 glass-card">
            <TabsTrigger value="analytics" className="data-[state=active]:gradient-purple data-[state=active]:text-white">
              <Icon name="BarChart3" className="mr-2" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:gradient-purple data-[state=active]:text-white">
              <Icon name="List" className="mr-2" size={16} />
              Транзакции
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" />
                    Динамика доходов
                  </CardTitle>
                  <CardDescription>Доходы и расходы за 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#9b87f5" strokeWidth={3} name="Доходы" />
                      <Line type="monotone" dataKey="expense" stroke="#F97316" strokeWidth={3} name="Расходы" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" className="text-secondary" />
                    Распределение по категориям
                  </CardTitle>
                  <CardDescription>Структура расходов</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
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
                          borderRadius: '8px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart2" className="text-accent" />
                  Сравнение периодов
                </CardTitle>
                <CardDescription>Помесячное сравнение</CardDescription>
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
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#9b87f5" radius={[8, 8, 0, 0]} name="Доходы" />
                    <Bar dataKey="expense" fill="#F97316" radius={[8, 8, 0, 0]} name="Расходы" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>История транзакций</CardTitle>
                    <CardDescription>Все финансовые операции</CardDescription>
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="completed">Завершенные</SelectItem>
                      <SelectItem value="pending">В обработке</SelectItem>
                      <SelectItem value="failed">Отклоненные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPayments.map((payment, index) => (
                    <div 
                      key={payment.id} 
                      className="flex items-center justify-between p-4 rounded-lg glass-card hover-lift border transition-all"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center text-white font-bold shadow-lg">
                          {payment.company.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{payment.company}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {payment.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{payment.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-xl font-bold">{payment.amount.toLocaleString('ru-RU')} ₽</p>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;