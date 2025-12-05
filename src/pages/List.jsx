import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tours");
        setTours(res.data);
      } catch (error) {
        console.log(error);
        setError("Không thể tải danh sách tour");
      }
    };

    getTours();
  }, []);

  const deleteTour = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xóa Tour này chứ?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/tours/${id}`);
      setTours(tours.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      await axios.patch(`http://localhost:3000/tours/${id}`, {
        status: newStatus,
      });

      setTours(tours.map((tour) =>
        tour.id === id ? { ...tour, status: newStatus } : tour
      ));
    } catch (err) {
      alert("Cập nhật trạng thái thất bại!");
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Đúng vị trí: return nằm trong component List
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tours</h1>

      {error && (
        <p className="text-red-600 mb-4 bg-red-50 p-3 rounded inline-block">
          {error}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-left">ID</th>
              <th className="px-4 py-3 border text-left">Hình ảnh</th>
              <th className="px-4 py-3 border text-left">Tên Tour</th>
              <th className="px-4 py-3 border text-left">Điểm đến</th>
              <th className="px-4 py-3 border text-left">Thời gian</th>
              <th className="px-4 py-3 border text-left">Giá</th>
              <th className="px-4 py-3 border text-left">Còn chỗ</th>
              <th className="px-4 py-3 border text-center">Trạng thái</th>
              <th className="px-4 py-3 border text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 border">{tour.id}</td>

                <td className="px-4 py-3 border">
                  <img
                    src={tour.image || "/placeholder.jpg"}
                    alt={tour.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-3 border font-medium">{tour.name}</td>
                <td className="px-4 py-3 border">{tour.destination}</td>
                <td className="px-4 py-3 border">{tour.duration}</td>
                <td className="px-4 py-3 border font-semibold">
                  {tour.price?.toLocaleString() || 0} ₫
                </td>
                <td className="px-4 py-3 border text-center">{tour.available}</td>

                {/* Switch Toggle */}
                <td className="px-4 py-3 border">
                  <label className="flex items-center justify-center cursor-pointer select-none">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={tour.status === "active"}
                        onChange={() => toggleStatus(tour.id, tour.status)}
                        disabled={updatingId === tour.id}
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                      <div
                        className={`dot absolute w-5 h-5 bg-white rounded-full shadow top-0.5 left-0.5 transition-all duration-300 ${
                          tour.status === "active"
                            ? "translate-x-full bg-green-500"
                            : "bg-gray-600"
                        } ${updatingId === tour.id ? "opacity-50" : ""}`}
                      ></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {tour.status === "active" ? "Hoạt động" : "Dừng"}
                    </span>
                  </label>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 border text-center">
                  <div className="flex gap-2 justify-center">
                    <Link
                      to={`/edit/${tour.id}`}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => deleteTour(tour.id)}
                      disabled={loading}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50 transition"
                    >
                      {loading ? "Đang xóa..." : "Xóa"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tours.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-8 text-lg">
          Chưa có tour nào.
        </p>
      )}
    </div>
  );
}

export default List;