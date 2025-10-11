import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  // Mock data for demonstration
  const mockStats = {
    totalUsers: 1247,
    totalProducts: 89,
    totalOrders: 342,
    totalRevenue: 45678.90,
    userGrowth: 12.5,
    orderGrowth: -3.2,
    revenueGrowth: 8.7,
    productGrowth: 5.1
  };

  const mockRecentOrders = [
    {
      _id: '1',
      user: { name: 'John Doe', email: 'john@example.com' },
      totalPrice: 129.99,
      status: 'delivered',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      user: { name: 'Jane Smith', email: 'jane@example.com' },
      totalPrice: 89.99,
      status: 'shipped',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      _id: '3',
      user: { name: 'Bob Johnson', email: 'bob@example.com' },
      totalPrice: 199.99,
      status: 'processing',
      createdAt: '2024-01-15T08:45:00Z'
    },
    {
      _id: '4',
      user: { name: 'Alice Brown', email: 'alice@example.com' },
      totalPrice: 49.99,
      status: 'pending',
      createdAt: '2024-01-15T07:20:00Z'
    }
  ];

  const mockTopProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      sold: 45,
      revenue: 4499.55,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'
    },
    {
      _id: '2',
      name: 'Smart Fitness Watch',
      sold: 32,
      revenue: 6399.68,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'
    },
    {
      _id: '3',
      name: 'Organic Cotton T-Shirt',
      sold: 28,
      revenue: 699.72,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const StatCard = ({ title, value, icon, growth, trend }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-amazon-orange bg-opacity-10 rounded-lg">
          {icon}
        </div>
      </div>
      {growth !== undefined && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(growth)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );

  if (loading) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={() => navigate('/admin/products/new')}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers.toLocaleString()}
            icon={<Users className="h-6 w-6 text-amazon-orange" />}
            growth={mockStats.userGrowth}
            trend="up"
          />
          <StatCard
            title="Total Products"
            value={mockStats.totalProducts}
            icon={<Package className="h-6 w-6 text-amazon-orange" />}
            growth={mockStats.productGrowth}
            trend="up"
          />
          <StatCard
            title="Total Orders"
            value={mockStats.totalOrders}
            icon={<ShoppingCart className="h-6 w-6 text-amazon-orange" />}
            growth={mockStats.orderGrowth}
            trend="down"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(mockStats.totalRevenue)}
            icon={<DollarSign className="h-6 w-6 text-amazon-orange" />}
            growth={mockStats.revenueGrowth}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <button
                    onClick={() => navigate('/admin/orders')}
                    className="text-amazon-orange hover:text-orange-600 text-sm font-medium"
                  >
                    View all
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockRecentOrders.map((order) => (
                    <div key={order._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-amazon-orange rounded-full flex items-center justify-center text-white font-semibold">
                          {order.user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.user.name}</p>
                          <p className="text-sm text-gray-500">{order.user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(order.totalPrice)}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                  <button
                    onClick={() => navigate('/admin/products')}
                    className="text-amazon-orange hover:text-orange-600 text-sm font-medium"
                  >
                    View all
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockTopProducts.map((product, index) => (
                    <div key={product._id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                        {index + 1}
                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sold} sold</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/admin/products')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Package className="h-8 w-8 text-amazon-orange mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Manage Products</p>
                <p className="text-xs text-gray-500">Add, edit, or remove products</p>
              </button>
              
              <button
                onClick={() => navigate('/admin/orders')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ShoppingCart className="h-8 w-8 text-amazon-orange mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Manage Orders</p>
                <p className="text-xs text-gray-500">Track and update orders</p>
              </button>
              
              <button
                onClick={() => navigate('/admin/users')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Users className="h-8 w-8 text-amazon-orange mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Manage Users</p>
                <p className="text-xs text-gray-500">View and manage user accounts</p>
              </button>
              
              <button
                onClick={() => navigate('/admin/analytics')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <BarChart3 className="h-8 w-8 text-amazon-orange mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Analytics</p>
                <p className="text-xs text-gray-500">View detailed analytics</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
