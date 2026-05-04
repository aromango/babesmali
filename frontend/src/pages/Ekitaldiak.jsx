import { useEffect, useState } from "react";

function Ekitaldiak() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    izena: "",
    deskribapena: "",
    data: "",
    lekua: "",
  });

  const token = localStorage.getItem("token");

  // Obtener usuario
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [token]);

  
  const fetchEvents = () => {
    fetch("http://localhost:8000/api/ekitaldiak", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  
  const joinEvent = (id) => {
    fetch(`http://localhost:8000/api/ekitaldiak/${id}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then(() => fetchEvents());
  };

  
  const createEvent = () => {
    fetch("http://localhost:8000/api/admin/ekitaldiak", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({
        izena: "",
        deskribapena: "",
        data: "",
        lekua: "",
      });
      fetchEvents();
    });
  };

  
  const deleteEvent = (id) => {
    if (!window.confirm("Ziur zaude?")) return;

    fetch(`http://localhost:8000/api/admin/ekitaldiak/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then(() => fetchEvents());
  };

  
  const isJoined = (event) => {
    if (!user) return false;
    return event.users.some((u) => u.id === user.id);
  };

  if (!token) {
    return (
      <div className="content-card text-center">
        <h3>🔒 Edukia babestuta</h3>
        <p>Ekitaldiak ikusteko saioa hasi behar duzu.</p>
      </div>
    );
  }

  return (
    <div className="content-card">
      <h2>Ekitaldiak</h2>

      {/* ADMIN: crear evento */}
      {user?.role === "admin" && (
        <div className="mb-4">
          <h4>Ekitaldi berria sortu</h4>
          <input
            className="form-control mb-2"
            placeholder="Izena"
            value={form.izena}
            onChange={(e) => setForm({ ...form, izena: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Lekua"
            value={form.lekua}
            onChange={(e) => setForm({ ...form, lekua: e.target.value })}
          />
          <input
            type="date"
            className="form-control mb-2"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Deskribapena"
            value={form.deskribapena}
            onChange={(e) =>
              setForm({ ...form, deskribapena: e.target.value })
            }
          ></textarea>

          <button className="btn btn-primary" onClick={createEvent}>
            Sortu ekitaldia
          </button>
        </div>
      )}

      {/* Lista de eventos */}
      {events.length === 0 ? (
        <p>Ez dago ekitaldirik.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Izena</th>
              <th>Data</th>
              <th>Lekua</th>
              <th>Parte-hartzaileak</th>
              <th>Ekintza</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.izena}</td>
                <td>{event.data}</td>
                <td>{event.lekua}</td>
                <td>{event.users.length}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Ezabatu
                    </button>
                  ) : isJoined(event) ? (
                    <span className="text-success">Izena emanda</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => joinEvent(event.id)}
                    >
                      Izena eman
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Ekitaldiak;
