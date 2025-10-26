import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CouponType,
  CreateCouponSchema,
  CreateCouponType,
} from "@/schema/coupon.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import couponApi from "@/apiRequest/coupon";
import { Loader2 } from "lucide-react";

interface Props {
  coupon: CouponType | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CouponFormModal({ coupon, onClose, onSuccess }: Props) {
  const form = useForm<CreateCouponType>({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: coupon || {
      code: "",
      type: "PRODUCT",
      description: "",
      discount: 0,
      minOrderValue: 0,
      expiredAt: "",
    },
  });

  const onSubmit = async (data: CreateCouponType) => {
    try {
      // Chuyển đổi kiểu dữ liệu
      const formattedData = {
        ...data,
        expiredAt: new Date(data.expiredAt),
      };

      console.log("Formatted data:", formattedData);

      if (coupon) {
        await couponApi.updateCoupon(coupon.id, formattedData);
        toast.success("Cập nhật coupon thành công");
      } else {
        await couponApi.createCoupon(formattedData);
        toast.success("Tạo coupon thành công");
      }
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {coupon ? "Chỉnh sửa Coupon" : "Tạo Coupon"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã coupon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại Coupon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Loại coupon (e.g., PRODUCT, SHIPPING)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount */}
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá (%)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập giảm giá"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Min Order Value */}
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá trị đơn hàng tối thiểu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập giá trị tối thiểu"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expired At */}
              <FormField
                control={form.control}
                name="expiredAt"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Ngày hết hạn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Chọn ngày hết hạn"
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mô tả (tùy chọn)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-32"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="w-32"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : coupon ? (
                  "Cập nhật"
                ) : (
                  "Tạo mới"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
