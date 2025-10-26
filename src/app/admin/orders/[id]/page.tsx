import OrderDetail from "@/app/admin/orders/_components/order-detail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <OrderDetail orderId={id} />
    </div>
  );
}
