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
  CategoryResType,
} from "@/schema/category.schema";
import Image from "next/image";
import { ImageOff, Loader2 } from "lucide-react";

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
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const isEditMode = !!category;

  const form = useForm<CreateCategoryBodyType>({
    resolver: zodResolver(CreateCategoryBody),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  useEffect(() => {
    if (category) {
      // Edit mode
      form.reset({
        name: category.name,
        icon: category.icon || "",
      });
      setIconPreview(category.icon);
    } else {
      // Create mode
      form.reset({
        name: "",
        icon: "",
      });
      setIconPreview(null);
    }
  }, [category, form]);

  const onSubmit = async (data: CreateCategoryBodyType) => {
    try {
      setLoading(true);

      const body = {
        name: data.name,
        ...(data.icon && { icon: data.icon }),
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

  const handleIconChange = (value: string) => {
    setIconPreview(value || null);
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Icon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/icon.png"
                      {...field}
                      disabled={loading}
                      onChange={(e) => {
                        field.onChange(e);
                        handleIconChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {iconPreview && (
              <div>
                <FormLabel>Preview Icon</FormLabel>
                <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border">
                  <Image
                    src={"/categories.png"}
                    alt="Icon preview"
                    fill
                    className="object-cover"
                    onError={() => setIconPreview(null)}
                  />
                </div>
              </div>
            )}

            {!iconPreview && form.watch("icon") && (
              <div className="mt-2 w-24 h-24 rounded-lg border flex items-center justify-center bg-muted">
                <ImageOff className="h-8 w-8 text-muted-foreground" />
              </div>
            )}

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
