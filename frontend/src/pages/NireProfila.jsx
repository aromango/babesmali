import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function NireProfila() {
  const [user, setUser] = useState(null);
  const [telefono, setTelefono] = useState("");
  const [helbidea, setHelbidea] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);

        if (data.profile) {
          setTelefono(data.profile.telefono || "");
          setHelbidea(data.profile.helbidea || "");
        }
      });
  }, [token]);

  const handleSave = () => {
    setMessage("");

    fetch("http://localhost:8000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        telefono,
        helbidea,
      }),
    }).then(() => setMessage("Profila eguneratuta ✅"));
  };

  if (!user) {
    return (
      <div className="content-card">
        <p>Kargatzen...</p>
      </div>
    );
  }

  return (
    <div className="content-card">
      <h2>Nire profila</h2>

      {message && <Alert variant="success">{message}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Izena</Form.Label>
          <Form.Control value={user.name} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Emaila</Form.Label>
          <Form.Control value={user.email} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefonoa</Form.Label>
          <Form.Control
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Helbidea</Form.Label>
          <Form.Control
            value={helbidea}
            onChange={(e) => setHelbidea(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleSave}>Gorde aldaketak</Button>
      </Form>
    </div>
  );
}

export default NireProfila;