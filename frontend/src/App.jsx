import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminObras from "./pages/AdminObras";
import LoginModal from "./components/LoginModal"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [user, setUser] = useState(null);

    if (!user) {
        return (
            <LoginModal
                show={showLogin}
                onHide={() => setShowLogin(false)}
                onLogin={(u) => setUser(u)}
            />
        );
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Redirige / al panel de admin */}
                <Route path="/" element={<Navigate to="/admin/obras" replace />} />

                {/* Panel admin con layout compartido */}
                <Route path="/admin">
                    <Route path="obras" element={<AdminObras />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;