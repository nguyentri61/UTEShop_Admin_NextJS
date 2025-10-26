import { CouponResponseType } from "@/schema/coupon.schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import couponApi from "@/apiRequest/coupon";

interface Props {
  coupons: CouponResponseType["data"][];
  loading: boolean;
  onEdit: (coupon: CouponResponseType["data"]) => void;
  onDelete: () => void;
}

export default function CouponTable({
  coupons,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa coupon này?")) return;
    try {
      await couponApi.deleteCoupon(id);
      toast.success("Xóa coupon thành công");
      onDelete();
    } catch (error) {
      toast.error("Không thể xóa coupon");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Không có coupon nào</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">ID</TableHead>
            <TableHead className="text-left">Code</TableHead>
            <TableHead className="text-left">Type</TableHead>
            <TableHead className="text-right">Discount</TableHead>
            <TableHead className="text-right">Min Order Value</TableHead>
            <TableHead className="text-left">Expired At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id} className="hover:bg-gray-50">
              <TableCell>{coupon.id}</TableCell>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.type}</TableCell>
              <TableCell className="text-right">{coupon.discount}</TableCell>
              <TableCell className="text-right">
                {coupon.minOrderValue}
              </TableCell>
              <TableCell>
                {new Date(coupon.expiredAt).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(coupon)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
