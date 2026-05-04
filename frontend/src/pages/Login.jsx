import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // mock por ahora
    localStorage.setItem("token", "fake-token");
    navigate("/ekitaldiak");
  };

  return (
    <div className="content-card" style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2>Hasi saioa</h2>

      <input className="form-control mb-2" placeholder="Emaila" />
      <input className="form-control mb-3" type="password" placeholder="Pasahitza" />

      <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
        Saioa hasi
      </button>

      <p className="text-center">
        Ez duzu konturik? <Link to="/register">Sortu kontua</Link>
      </p>
    </div>
  );
}

export default Login;