"use client";

import { useEffect, useState } from "react";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import categoryApiRequest from "@/apiRequest/category";
import {
  CreateCategoryBody,
  CreateCategoryBodyType,
} from "@/schema/category.schema";
import { Loader2 } from "lucide-react";

interface CategoryFormModalProps {
  category: CategoryResType | null; // null = Create mode, có data = Edit mode
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryFormModal({
  category,
  open,
  onClose,
  onSuccess,
}: CategoryFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(category?.name || "");
  const isEditMode = !!category;

  const form = useForm<CreateCategoryBodyType>({
    resolver: zodResolver(CreateCategoryBody),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category) {
      // Edit mode
      form.reset({
        name: category.name,
      });
      setName(category.name);
    } else {
      // Create mode
      form.reset({
        name: "",
      });
      setName("");
    }
  }, [category, form]);

  const onSubmit = async (data: CreateCategoryBodyType) => {
    if (!name.trim()) {
      toast.error("Tên danh mục không được để trống");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name: data.name,
      };

      if (isEditMode) {
        // Update
        await categoryApiRequest.update(category.id, body);
        toast.success("Cập nhật danh mục thành công");
      } else {
        // Create
        await categoryApiRequest.create(body);
        toast.success("Tạo danh mục thành công");
      }

      onSuccess();
      onClose();
    } catch (error: unknown) {
      toast.error(
        isEditMode
          ? "Có lỗi xảy ra khi cập nhật danh mục"
          : "Có lỗi xảy ra khi tạo danh mục"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên danh mục <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên danh mục"
                      {...field}
                      disabled={loading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Cập nhật" : "Tạo mới"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="flex-1"
              >
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
