import OrderTable from "@/app/admin/orders/_components/order-table";

export default function OrdersPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Danh sách đơn hàng
      </h1>
      <div className="bg-white shadow rounded-lg p-4">
        <OrderTable />
      </div>
    </div>
  );
}
