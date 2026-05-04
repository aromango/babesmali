import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="content-card" style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2>Erregistratu</h2>

      <input className="form-control mb-2" placeholder="Izena" />
      <input className="form-control mb-2" placeholder="Emaila" />
      <input className="form-control mb-3" type="password" placeholder="Pasahitza" />

      <button className="btn btn-success w-100 mb-3">
        Kontua sortu
      </button>

      <p className="text-center">
        Baduzu kontua? <Link to="/login">Hasi saioa</Link>
      </p>
    </div>
  );
}

export default Register;