import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";

import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";


const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; 
};

const Layout = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Đã đăng xuất thành công!");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            WEB501 App
          </Link>

          {/* Menu chính - chỉ hiện khi đã đăng nhập */}
          {token && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-gray-200 transition">
                Trang chủ
              </Link>
              <Link to="/list" className="hover:text-gray-200 transition">
                Danh sách
              </Link>
              <Link to="/add" className="hover:text-gray-200 transition">
                Thêm mới
              </Link>
            </div>
          )}

          {/* Phần đăng nhập / đăng xuất */}
          <div className="hidden md:flex items-center space-x-6">
            {token ? (
              <>
                <span className="font-medium">
                  Xin chào, <strong>{user?.name || user?.email || "User"}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  state={{ from: location }}
                  className="hover:text-gray-200 transition"
                >
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:text-gray-200 transition">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Nội dung chính */}
      <div className="max-w-6xl mx-auto mt-24 px-4 pb-10">
        <Routes>
          {/* Trang công khai */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Các trang cần đăng nhập - dùng Outlet để gọn hơn */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <div className="text-center py-20">
                  <h1 className="text-5xl font-bold text-blue-600 mb-4">
                    Chào mừng đến với WEB501
                  </h1>
                  <p className="text-xl text-gray-600">
                    Ứng dụng quản lý dữ liệu đơn giản & hiệu quả
                  </p>
                </div>
              }
            />
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>

          {/* Trang không tồn tại → về trang chủ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Toaster position="top-right" />
    </>
  );
};

function App() {
  return <Layout />;
}

export default App;