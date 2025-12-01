import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function Login() {
  const navigate = useNavigate();

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

    // Kiểm tra trống
    if (!form.email || !form.password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", form);

      const token = res.data.token;
      localStorage.setItem("token", token);

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      alert("Sai email hoặc mật khẩu!");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
