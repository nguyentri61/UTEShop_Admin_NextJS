import userApiRequest from "@/apiRequest/user";
import UsersTable from "@/app/admin/users/_components/users-table";
import { UserType } from "@/schema/user.schema";

type User = UserType;

export default async function UsersPage() {
  let users: User[] = [];
  try {
    const response = await userApiRequest.getAllUsers();
    const data = response.payload.data as User | User[];
    users = Array.isArray(data) ? data : [data];
    console.log("Fetched users:", users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
            <p className="text-sm text-slate-500">Danh sách người dùng</p>
          </div>
          <section className="space-y-4">
            <UsersTable initialUsers={users} />
          </section>
        </main>
      </div>
    </div>
  );
}
