import { useEffect, useState } from "react";

function Adopzioak() {
  const [adoptions, setAdoptions] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((u) => setUser(u));
  }, [token]);

  useEffect(() => {
    if (!user) return;

    const url =
      user.role === "admin"
        ? "http://localhost:8000/api/admin/adopzioak"
        : "http://localhost:8000/api/adopzioak";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAdoptions(data));
  }, [user, token]);

  const approveAdoption = (id) => {
    fetch(`http://localhost:8000/api/admin/adopzioak/${id}/approve`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then(() => window.location.reload());
  };

  const rejectAdoption = (id) => {
    fetch(`http://localhost:8000/api/admin/adopzioak/${id}/reject`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then(() => window.location.reload());
  };

  if (!token) {
    return (
      <div className="content-card text-center">
        <h3>🔒 Edukia babestuta</h3>
        <p>Adopzioak ikusteko saioa hasi behar duzu.</p>
      </div>
    );
  }

  return (
    <div className="content-card">
      <h2>Adopzioak</h2>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Animalia</th>
            {user?.role === "admin" && <th>Erabiltzailea</th>}
            <th>Egoera</th>
            {user?.role === "admin" && <th>Ekintzak</th>}
          </tr>
        </thead>
        <tbody>
          {adoptions.map((a) => (
            <tr key={a.id}>
              <td>{a.animal.izena}</td>

              {user?.role === "admin" && (
                <td>{a.user.name}</td>
              )}

              <td>{a.egoera}</td>

              {user?.role === "admin" && a.egoera === "eskatuta" && (
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => approveAdoption(a.id)}
                  >
                    Onartu
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => rejectAdoption(a.id)}
                  >
                    Ukatu
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adopzioak;
