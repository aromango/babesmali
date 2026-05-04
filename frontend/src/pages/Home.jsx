import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>

      {/* ================= QUIÉNES SOMOS ================= */}
      <div className="content-card mb-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h2>Nor gara gu?</h2>
            <p className="mt-3">
              Animaliak aplikazioa animalien aterpeen kudeaketa errazteko sortu da.
              Administratzaileek eta boluntarioek animaliak, adopzio-prozesuak
              eta ekitaldiak modu eraginkorrean kudeatu ahal izateko plataforma da.
            </p>
            <p>
              Helburua da animalien ongizatea bermatzea eta adopzio arduratsuak
              sustatzea.
            </p>
          </Col>

          <Col md={6} className="text-center">
            <Image
              src="/images/welcome.png"
              alt="Animalien aterpea eta boluntarioak"
              fluid
              rounded
            />
          </Col>
        </Row>
      </div>

      {/* ================= CARTELERAS ================= */}
      <div className="content-card">
        <Row className="g-4 align-items-stretch">

          {/* ANIMES */}
          <Col md={4} className="text-center">
            <div className="feature-card h-100">
              <div className="feature-image-wrapper mb-3">
                <img
                  src="/images/animales.jpg"
                  alt="Animaliak"
                  className="feature-image"
                />
              </div>

              <h5>Animaliak</h5>
              <p>
                Babeslekuan dauden animalien informazioa eta kudeaketa.
              </p>

              <Button as={Link} to="/animaliak" variant="primary">
                Ikusi animaliak
              </Button>
            </div>
          </Col>

          {/* EKITALDIAK */}
          <Col md={4} className="text-center">
            <div className="feature-card h-100">
              <div className="feature-image-wrapper mb-3">
                <img
                  src="/images/eventos.jpg"
                  alt="Ekitaldiak"
                  className="feature-image"
                />
              </div>

              <h5>Ekitaldiak</h5>
              <p>
                Adopzio eta boluntariotza ekitaldien antolaketa.
              </p>

              <Button as={Link} to="/ekitaldiak" variant="primary">
                Ikusi ekitaldiak
              </Button>
            </div>
          </Col>

          {/* ADOPZIOAK */}
          <Col md={4} className="text-center">
            <div className="feature-card h-100">
              <div className="feature-image-wrapper mb-3">
                <img
                  src="/images/adopzioa.jpg"
                  alt="Adopzioak"
                  className="feature-image"
                />
              </div>

              <h5>Adopzioak</h5>
              <p>
                Animalien adopzio eskaeren jarraipena.
              </p>

              <Button as={Link} to="/adopzioak" variant="primary">
                Ikusi adopzioak
              </Button>
            </div>
          </Col>

        </Row>
      </div>

    </Container>
  );
}

export default Home;