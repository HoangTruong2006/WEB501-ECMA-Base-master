import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tours/${id}`);
        const tour = response.data;

        setName(tour.name);
        setDestination(tour.destination);
        setDuration(tour.duration);
        setPrice(tour.price);
        setAvailable(tour.available);
        setImage(tour.image);
      } catch (error) {
        toast.error("Không tìm thấy tour");
      }
    };

    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTour = {
      name,
      destination,
      duration,
      price: Number(price),
      available,
      image,
    };

    try {
      await axios.put(`http://localhost:3000/tours/${id}`, updatedTour);
      toast.success("Cập nhật tour thành công");
      navigate("/");
    } catch (error) {
      toast.error("Cập nhật tour thất bại");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật tour</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Tên Tour</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Available */}
        <div>
          <label className="block font-medium mb-1">Tình trạng</label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">-- Chọn --</option>
            <option value="Còn chỗ">Còn chỗ</option>
            <option value="Hết chỗ">Hết chỗ</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Ảnh</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Cập nhật Tour
        </button>
      </form>
    </div>
  );
}

export default Edit;
