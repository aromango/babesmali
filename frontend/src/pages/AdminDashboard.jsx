import { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [dogInfo, setDogInfo] = useState(null); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Estadísticas internas
    fetch("http://localhost:8000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));

   
    fetch("http://localhost:8000/api/admin/dog-info", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDogInfo(data));
  }, [token]);

  if (!stats) return null;

  return (
    <div className="content-card">
      <h2>Admin panela</h2>

      {/* ===== TARJETAS ===== */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3">
            <h5>Animalia guztira</h5>
            <h2>{stats.animals_total}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <h5>Eskuragarri</h5>
            <h2>{stats.animals_available}</h2>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <h5>Adopzioak guztira</h5>
            <h2>{stats.adoptions_total}</h2>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>Ekitaldiak</h5>
            <h2>{stats.events_total}</h2>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3">
            <h5>Boluntarioak</h5>
            <h2>{stats.volunteers_total}</h2>
          </Card>
        </Col>
      </Row>

      {/* ===== TAULA ===== */}
      <h4>Ekitaldietako parte‑hartzaileak</h4>

      <Table striped>
        <thead>
          <tr>
            <th>Ekitaldia</th>
            <th>Boluntario kopurua</th>
          </tr>
        </thead>
        <tbody>
          {stats.events.map((e) => (
            <tr key={e.id}>
              <td>{e.izena}</td>
              <td>{e.users_count}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ===== API EXTERNA ===== */}
      {dogInfo && (
        <>
          <h4 className="mt-5">🐶 Kanpoko APIaren datuak (TheDogAPI)</h4>

          <div className="d-flex align-items-center gap-4">
            
        {dogInfo.image && (
         <img
            src={dogInfo.image}
            alt="Dog breed"
             width="150"
             style={{ borderRadius: "8px" }}
             />
            )}


            <div>
              <p><strong>Arraza:</strong> {dogInfo.name}</p>
              <p><strong>Jatorria:</strong> {dogInfo.origin}</p>
              <p className="text-muted">
                Datu hauek kanpoko API batetik (TheDogAPI) lortu dira
                informazio osagarria eskaintzeko.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;