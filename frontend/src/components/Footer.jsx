import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="app-footer mt-auto">
      <Container>
        <Row className="text-center text-md-start">

          {/* SOBRE NOSOTROS */}
          <Col md={4} className="mb-3">
            <h5>Animaliak</h5>
            <p>
              Animalien aterpeetako kudeaketa sistema modernoa eta erabilerraza.
            </p>
          </Col>

          {/* REDES */}
          <Col md={4} className="mb-3">
            <h5>Sare sozialak</h5>
            <p>
              <FaInstagram /> Instagram<br />
              <FaTwitter /> Twitter
            </p>
          </Col>

          {/* UBICACIÓN */}
          <Col md={4} className="mb-3">
            <h5>Kontaktua</h5>
            <p>
              <FaMapMarkerAlt /> Donostia, Gipuzkoa<br />
              <FaEnvelope /> kontaktua@animaliak.eus
            </p>
          </Col>

        </Row>

        <hr />

        <p className="text-center mt-3">
          © 2026 Animaliak — Eskubide guztiak erreserbatuta
        </p>
      </Container>
    </footer>
  );
}

export default Footer;