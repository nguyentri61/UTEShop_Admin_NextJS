const mockData = {
  stats: {
    orders: 128,
    revenue: 12540,
    users: 842,
    products: 214,
  },
  recentOrders: [
    {
      id: "ORD-1001",
      customer: "Nguyễn Văn A",
      total: 125.5,
      status: "Delivered",
      date: "2025-10-20",
    },
    {
      id: "ORD-1002",
      customer: "Trần Thị B",
      total: 59.0,
      status: "Processing",
      date: "2025-10-21",
    },
    {
      id: "ORD-1003",
      customer: "Lê Văn C",
      total: 320.75,
      status: "Cancelled",
      date: "2025-10-22",
    },
  ],
  products: [
    { id: "P-001", name: "Bàn học gỗ", price: 120.0, stock: 12 },
    { id: "P-002", name: "Ghế xoay", price: 75.0, stock: 5 },
    { id: "P-003", name: "Đèn bàn LED", price: 20.0, stock: 34 },
  ],
  users: [
    {
      id: "U-001",
      name: "Admin One",
      email: "admin1@uteshop.local",
      role: "Admin",
    },
    {
      id: "U-002",
      name: "Staff Two",
      email: "staff2@uteshop.local",
      role: "Staff",
    },
  ],
  notifications: [
    { id: "N-1", title: "Backup completed", time: "2h ago" },
    { id: "N-2", title: "New comment on product", time: "5h ago" },
  ],
  promotions: [{ id: "PR-1", title: "Flash Sale 20%", expires: "2025-10-30" }],
};

export default mockData;
