"use client";

import { useEffect, useState } from "react";
import { CouponResponseType } from "@/schema/coupon.schema";
import { toast } from "sonner";
import couponApi from "@/apiRequest/coupon";
import CouponTable from "@/app/admin/coupons/_components/coupon-table";
import CouponFormModal from "@/app/admin/coupons/_components/coupon-form-modal";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponResponseType["data"][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState<
    CouponResponseType["data"] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await couponApi.getAllCoupons();
      setCoupons(response.payload.data);
    } catch (error) {
      toast.error("Không thể tải danh sách coupon");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateOrUpdateSuccess = () => {
    setIsModalOpen(false);
    fetchCoupons();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Coupon</h1>
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedCoupon(null);
            setIsModalOpen(true);
          }}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Tạo Coupon</span>
        </Button>
      </div>

      {/* Coupon Table */}
      <div className="bg-white shadow rounded-lg p-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Không có coupon nào</p>
          </div>
        ) : (
          <CouponTable
            coupons={coupons}
            loading={loading}
            onEdit={(coupon) => {
              setSelectedCoupon(coupon);
              setIsModalOpen(true);
            }}
            onDelete={fetchCoupons}
          />
        )}
      </div>

      {/* Coupon Form Modal */}
      {isModalOpen && (
        <CouponFormModal
          coupon={selectedCoupon}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateOrUpdateSuccess}
        />
      )}
    </div>
  );
}
