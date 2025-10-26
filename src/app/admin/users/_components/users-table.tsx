"use client";
import React, { useMemo, useState } from "react";
import userApiRequest from "@/apiRequest/user";
import EditUserModal from "@/app/admin/users/_components/edit-users-table";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  fullName: string | null;
  role: "USER" | "ADMIN";
  gender: string | null;
  phone: string | null;
  address: string | null;
  blocked: boolean;
};

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null); // State để lưu user đang chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển modal
  const perPage = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      return (
        !q ||
        u.email.toLowerCase().includes(q) ||
        (u.fullName || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    });
  }, [users, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  async function toggleBlock(id: string) {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const action = user.blocked ? "mở chặn" : "chặn";
    if (!confirm(`Bạn có chắc muốn ${action} người dùng ${user.email}?`))
      return;

    try {
      // Gọi API block/unblock user
      await userApiRequest.blockUser(id, !user.blocked);

      // Cập nhật trạng thái trong state
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u))
      );

      toast.success(`Đã ${action} người dùng ${user.email}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái block:", error);
      toast.error("Không thể cập nhật trạng thái block. Vui lòng thử lại.");
    }
  }

  async function handleEditUser(updatedUser: User) {
    try {
      // Gọi API cập nhật thông tin user
      // map nullable fields to non-nullable strings and convert gender to optional value
      await userApiRequest.updateUser(updatedUser.id, {
        fullName: updatedUser.fullName || "",
        address: updatedUser.address || "",
        phone: updatedUser.phone || "",
        gender:
          (updatedUser.gender as "MALE" | "FEMALE" | "OTHER") || undefined,
      });

      // Cập nhật thông tin user trong state
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );

      toast.success("Cập nhật thông tin người dùng thành công!");
      setIsModalOpen(false); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      toast.error("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full max-w-2xl">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm theo email, tên, phone hoặc id..."
            className="flex-1 bg-white dark:bg-slate-900 border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-500">
            Tổng: <span className="font-semibold">{filtered.length}</span> người
            dùng
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Họ tên
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  SĐT
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Địa chỉ
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Giới tính
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Vai trò
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {pageData.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              )}

              {pageData.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                    {u.email}
                  </td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                    {u.fullName || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {u.phone || "-"}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs truncate"
                    title={u.address || "-"}
                  >
                    {u.address || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {u.gender === "MALE"
                      ? "Nam"
                      : u.gender === "FEMALE"
                      ? "Nữ"
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.blocked ? (
                      <span className="inline-flex px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 text-xs font-medium">
                        Bị chặn
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-xs font-medium">
                        Hoạt động
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(u); // Lưu user đang chỉnh sửa
                          setIsModalOpen(true); // Mở modal
                        }}
                        className="text-xs px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 font-medium transition-colors"
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => toggleBlock(u.id)}
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                          u.blocked
                            ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                            : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                        }`}
                      >
                        {u.blocked ? "Mở chặn" : "Chặn"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Hiển thị <span className="font-semibold">{pageData.length}</span> /{" "}
          <span className="font-semibold">{filtered.length}</span> người dùng
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            ← Trước
          </button>

          <div className="text-sm text-slate-600 dark:text-slate-400">
            Trang <span className="font-semibold">{page}</span> /{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Sau →
          </button>
        </div>
      </div>

      {/* Modal chỉnh sửa thông tin user */}
      {isModalOpen && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEditUser}
        />
      )}
    </div>
  );
}
