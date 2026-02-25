"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/login");
      return;
    }

    setLoading(true);

    fetch(`http://localhost:5050/api/admin/users?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page, router]);

const handleDeleteUser = (userId: string) => {
  const token = localStorage.getItem("token");

  toast((t) => (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">
        Are you sure you want to delete this user?
      </p>

      <div className="flex gap-3 justify-end">
        <button
          onClick={async () => {
            toast.dismiss(t.id);

            try {
              const res = await fetch(
                `http://localhost:5050/api/admin/users/${userId}`,
                {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              const data = await res.json();

              if (!res.ok) {
                toast.error(data.message || "Delete failed");
                return;
              }

              setUsers((prev) =>
                prev.filter((u) => u._id !== userId)
              );

              toast.success(data.message);

            } catch (error) {
              toast.error("Server error");
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
        >
          Delete
        </button>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  ));
};
  const handleEditUser = (user: any) => {
    setEditUser({ ...user });
  };

  const handleSaveUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || !editUser) return;

    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("email", editUser.email);
    formData.append("role", editUser.role);

    if (editUser.password)
      formData.append("password", editUser.password);

    const res = await fetch(
      `http://localhost:5050/api/admin/users/${editUser._id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === editUser._id ? data.data : u
        )
      );
      setEditUser(null);
    }
  };

 return (
  <div className="min-h-screen bg-gray-100 p-10">
    <div className="bg-white rounded-2xl shadow-lg p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          All Registered Users
        </h2>

        <button
          onClick={() => router.push("/admin/users/create")}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Create
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading users...
        </div>
      ) : (
        <>
          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">

                        <button
                          onClick={() =>
                            router.push(`/admin/users/${user._id}`)
                          }
                          className="text-gray-600 hover:text-black transition"
                        >
                          View
                        </button>

                        <button
  onClick={() => router.push(`/admin/users/${user._id}/edit`)}
                          className="text-blue-500 hover:text-blue-600 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteUser(user._id)
                          }
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-8">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-lg border ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded-lg border ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              Next
            </button>

          </div>

          {/* EDIT MODAL */}
          {editUser && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8 w-[420px]">

                <h3 className="text-xl font-semibold mb-6">
                  Edit User
                </h3>

                <input
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-pink-500 outline-none"
                />

                <input
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-pink-500 outline-none"
                />

                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-pink-500 outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditUser(null)}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveUser}
                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                  >
                    Save
                  </button>
                </div>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  </div>
);
}