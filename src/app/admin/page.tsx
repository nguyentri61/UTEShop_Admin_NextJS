import { Card } from "@/components/ui/card";
import mockData from "@/lib/mockData";

export default function AdminPage() {
  const { stats, recentOrders, products, users } = mockData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-500">Tổng quan quản trị UteShop</p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="Đơn hàng">
              <div className="text-2xl font-bold">{stats.orders}</div>
              <div className="text-sm text-slate-500">Đơn trong tháng</div>
            </Card>
            <Card title="Doanh thu">
              <div className="text-2xl font-bold">
                ${stats.revenue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500">Tổng doanh thu</div>
            </Card>
            <Card title="Người dùng">
              <div className="text-2xl font-bold">{stats.users}</div>
              <div className="text-sm text-slate-500">
                Người dùng đã đăng ký
              </div>
            </Card>
            <Card title="Sản phẩm">
              <div className="text-2xl font-bold">{stats.products}</div>
              <div className="text-sm text-slate-500">Sản phẩm trong kho</div>
            </Card>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card title="Đơn hàng gần đây">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-500">
                  <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Khách hàng</th>
                    <th className="py-2">Tổng</th>
                    <th className="py-2">Trạng thái</th>
                    <th className="py-2">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="py-2">{o.id}</td>
                      <td className="py-2">{o.customer}</td>
                      <td className="py-2">${o.total}</td>
                      <td className="py-2">{o.status}</td>
                      <td className="py-2">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <div className="space-y-4">
              <Card title="Sản phẩm nổi bật">
                <ul className="space-y-2">
                  {products.map((p) => (
                    <li key={p.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-slate-500">ID: {p.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${p.price}</div>
                        <div className="text-xs text-slate-500">
                          {p.stock} trong kho
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Người dùng">
                <ul className="space-y-2 text-sm">
                  {users.map((u) => (
                    <li key={u.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">{u.role}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
