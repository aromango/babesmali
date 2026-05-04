import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./Header.css";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  /* ---------- USUARIO LOGUEADO ---------- */
  const [user, setUser] = useState(null);

  /* ---------- LOGIN ---------- */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  /* ---------- REGISTER ---------- */
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  /* ---------- CARGAR USUARIO AL REFRESCAR ---------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  /* ---------- LOGIN REAL ---------- */
  const handleLogin = async () => {
    setLoginError("");
    setLoadingLogin(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.message || "Email edo pasahitza okerra");
        setLoadingLogin(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setLoginEmail("");
      setLoginPassword("");
      setShowLogin(false);

    } catch {
      setLoginError("Ezin izan da zerbitzariarekin konektatu");
    }

    setLoadingLogin(false);
  };

  /* ---------- REGISTER REAL ---------- */
  const handleRegister = async () => {
    setRegisterError("");
    setRegisterSuccess("");

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegisterError(data.message || "Errorea kontua sortzean");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setRegisterSuccess("Kontua behar bezala sortu da ✅");
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");

      setTimeout(() => setShowRegister(false), 1000);
    } catch {
      setRegisterError("Ezin izan da zerbitzariarekin konektatu");
    }
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar expand="lg" className="header-gradient" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <Image
              src="/images/Logo.png"
              alt="Animaliak logoa"
              width="42"
              height="42"
              roundedCircle
              className="logo-img"
            />
            <span className="brand-text">Babesmali</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link as={Link} to="/">Hasiera</Nav.Link>
              <Nav.Link as={Link} to="/animaliak">Animaliak</Nav.Link>
              <Nav.Link as={Link} to="/ekitaldiak">Ekitaldiak</Nav.Link>
              <Nav.Link as={Link} to="/adopzioak">Adopzioak</Nav.Link>

              
  {user ? (
  <NavDropdown
    title={`👤 ${user.name}`}
    id="user-dropdown"
    align="end"
    menuVariant="light"
    className="ms-lg-3"
  >
    <NavDropdown.Item as={Link} to="/profile">
      Nire profila
    </NavDropdown.Item>

    {user.role === "admin" && (
      <NavDropdown.Item as={Link} to="/admin">
        Admin panela
      </NavDropdown.Item>
    )}

    <NavDropdown.Divider />

    <NavDropdown.Item onClick={handleLogout}>
      Saioa itxi
    </NavDropdown.Item>
  </NavDropdown>
) : (
  <Button
    variant="light"
    size="sm"
    className="ms-lg-3"
    onClick={openLogin}
  >
    Hasi saioa
  </Button>
)}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ================= LOGIN MODAL ================= */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Saioa hasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {loginError && <Alert variant="danger">{loginError}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Emaila</Form.Label>
              <Form.Control
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pasahitza</Form.Label>
              <Form.Control
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={handleLogin}
              disabled={loadingLogin}
            >
              {loadingLogin ? "Egiaztatzen..." : "Saioa hasi"}
            </Button>

            <div className="text-center">
              Ez duzu konturik?
              <span
                onClick={openRegister}
                style={{ color: "#0d6efd", cursor: "pointer", marginLeft: "5px" }}
              >
                Sortu kontua
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ================= REGISTER MODAL ================= */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kontu berria sortu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {registerError && <Alert variant="danger">{registerError}</Alert>}
            {registerSuccess && <Alert variant="success">{registerSuccess}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Izena</Form.Label>
              <Form.Control
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Emaila</Form.Label>
              <Form.Control
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pasahitza</Form.Label>
              <Form.Control
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" className="w-100" onClick={handleRegister}>
              Kontua sortu
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;