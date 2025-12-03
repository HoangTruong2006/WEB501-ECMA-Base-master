import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy trang người dùng đang muốn vào

  const [form, setForm] = useState({
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

    if (!form.email || !form.password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", form);

      // Lưu token và thông tin user
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Chào mừng ${user.name || user.email}! Đăng nhập thành công!`);

      // Quay lại trang người dùng đang muốn vào, nếu không có thì về trang chủ
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        toast.error("Sai email hoặc mật khẩu!");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Đăng nhập
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email của bạn"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Đăng nhập ngay
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Chưa có tài khoản?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 font-semibold cursor-pointer hover:underline"
        >
          Đăng ký ngay
        </span>
      </p>
    </div>
  );
}

export default Login;