import axios from "axios";
import { useEffect, useState } from "react";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTours = async () => {
      try {
        const res = await axios.get("http://localhost:3000/tours");
        setTours(res.data);
      } catch (error) {
        console.log(error);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tours</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">id</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">Duration</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Available</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>

                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border">{tour.name}</td>
                <td className="px-4 py-2 border">{tour.destination}</td>
                <td className="px-4 py-2 border">{tour.duration}</td>
                <td className="px-4 py-2 border">
                  {tour.price.toLocaleString()} ₫
                </td>
                <td className="px-4 py-2 border">{tour.available}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => deleteTour(tour.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
