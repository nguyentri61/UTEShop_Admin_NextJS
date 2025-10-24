"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CreateProductDto,
  CreateProductDtoType,
  ProductResponseDtoType,
} from "@/schema/product.schema";
import productApi from "@/apiRequest/product";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  product?: ProductResponseDtoType | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductFormModal({
  open,
  product,
  onClose,
  onSuccess,
}: Props) {
  const isEdit = !!product;
  const form = useForm<CreateProductDtoType>({
    resolver: zodResolver(CreateProductDto),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: undefined,
      stock: 0,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: (product as any).description || "",
        price: (product as any).price || 0,
        discountPrice: (product as any).discountPrice,
        stock: (product as any).stock || 0,
        categoryId: product.category?.id || "",
      });
    } else {
      form.reset();
    }
  }, [product]);

  const onSubmit = async (data: CreateProductDtoType) => {
    try {
      if (isEdit && product) {
        await productApi.update(product.id, data);
        toast.success("Cập nhật sản phẩm thành công");
      } else {
        await productApi.create(data);
        toast.success("Tạo sản phẩm thành công");
      }
      onSuccess();
    } catch (err: unknown) {
      toast.error("Xảy ra lỗi khi lưu sản phẩm");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kho</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* thêm các field khác tương tự */}
            <div className="flex gap-2 pt-2">
              <Button type="submit">
                {/* show loader when submitting */}Lưu
              </Button>
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
