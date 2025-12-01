import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res = await axios.post("http://localhost:3000/register", form);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert("Lỗi đăng ký!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tên"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Đã có tài khoản?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
