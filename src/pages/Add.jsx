import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Add() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTour = {
      name,
      destination,
      duration,
      price: Number(price),
      available,
      image,
    };

    try {
      await axios.post("http://localhost:3000/tours", newTour);
      toast.success("Thêm tour thành công!");

      // Reset form
      setName("");
      setDestination("");
      setDuration("");
      setPrice("");
      setAvailable("");
      setImage("");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm tour!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm Tour</h1>

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
            placeholder="Ví dụ: 3 ngày 2 đêm"
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
            placeholder="https://picsum.photos/400/300"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thêm Tour
        </button>
      </form>
    </div>
  );
}

export default Add;
