import { useEffect, useState } from "react";

function Animaliak() {
  const [animals, setAnimals] = useState([]);
  const [myAdoptions, setMyAdoptions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        
        const userRes = await fetch("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setUser(await userRes.json());

        
        const animalsRes = await fetch("http://localhost:8000/api/animals", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setAnimals(await animalsRes.json());

        
        const adoptionsRes = await fetch("http://localhost:8000/api/adopzioak", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setMyAdoptions(await adoptionsRes.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const hasRequested = (animalId) =>
    myAdoptions.some((a) => a.animal.id === animalId);

  if (!token) {
    return (
      <div className="content-card text-center">
        <h3>🔒 Edukia babestuta</h3>
        <p>Animaliak ikusteko saioa hasi behar duzu.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content-card text-center">
        <p>Kargatzen...</p>
      </div>
    );
  }

  return (
    <div className="content-card">
      <h2>Animaliak</h2>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Argazkia</th>
            <th>Izena</th>
            <th>Espeziea</th>
            <th>Arraza</th>
            <th>Adina</th>
            <th>Egoera</th>
            <th>Ekintza</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>
                {animal.argazkia ? (
                  <img
                    src={animal.argazkia}
                    alt={animal.izena}
                    className="animal-img"
                  />
                ) : (
                  <span>—</span>
                )}
              </td>
              <td>{animal.izena}</td>
              <td>{animal.espeziea}</td>
              <td>{animal.arraza || "-"}</td>
              <td>{animal.adina}</td>
              <td>{animal.egoera}</td>

              <td>
                {user?.role === "admin" ? (
                  <span className="text-muted">—</span>
                ) : animal.egoera !== "eskuragarri" ? (
                  <span className="text-muted">Adoptatua</span>
                ) : hasRequested(animal.id) ? (
                  <span className="text-warning">Adopzioa eskatuta</span>
                ) : (
                  <button className="btn btn-sm btn-success">
                    Eskatu adopzioa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Animaliak;
