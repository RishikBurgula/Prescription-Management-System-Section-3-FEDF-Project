import { useState, useEffect } from "react";
import "./App.css";

const drugs = {
  Paracetamol: { child: 250, adult: 500 },
  Ibuprofen: { child: 200, adult: 400 },
  Amoxicillin: { child: 250, adult: 500 },
  Cetirizine: { child: 5, adult: 10 },
  Azithromycin: { child: 250, adult: 500 }
};

export default function App() {
  const [page, setPage] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [drug, setDrug] = useState("Paracetamol");
  const [dosage, setDosage] = useState("");
  const [days, setDays] = useState("");

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("records")) || [];
    setRecords(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "records",
      JSON.stringify(records)
    );
  }, [records]);

  function register() {
    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);

    alert("Account Created");
    setPage("login");
  }

  function login() {
    if (
      username === localStorage.getItem("user") &&
      password === localStorage.getItem("pass")
    ) {
      setPage("dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  function calculateDosage() {
    const dose =
      Number(age) < 12
        ? drugs[drug].child
        : drugs[drug].adult;

    setDosage(`${dose} mg`);
  }

  function savePrescription() {
    if (!patient || !age || !dosage) {
      alert("Fill all fields");
      return;
    }

    const item = {
      id: "RX-" + Date.now(),
      doctor,
      hospital,
      patient,
      age,
      drug,
      dosage,
      days,
      date: new Date().toLocaleString()
    };

    setRecords([item, ...records]);

    setDoctor("");
    setHospital("");
    setPatient("");
    setAge("");
    setDosage("");
    setDays("");
  }

  function deleteRecord(id) {
    setRecords(
      records.filter((r) => r.id !== id)
    );
  }

  const filteredRecords = records.filter((r) =>
    r.patient
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (page === "login") {
    return (
      <div className="login-card">

        <div className="logo">
<h1>CareFlow</h1>

        </div>

        <input
          placeholder="Email or Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={login}
        >
          Continue →
        </button>

        <button
          className="primary-btn"
          onClick={() =>
            setPage("register")
          }
        >
          Let's Create Your Account
        </button>

      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="login-card">

        <h1>Welcome to CareFlow</h1>

        <p className="subtitle">
          Create your account to start managing
          patients and prescriptions.
        </p>

        <input
          placeholder="Choose Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Choose Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={register}
        >
          Create Account
        </button>

      </div>
    );
  }

  return (
    <div className="container">

      <h1>CareFlow Dashboard</h1>

      <p className="subtitle">
        Manage patients, prescriptions and
        healthcare records from one place.
      </p>

      <div className="stats">

        <div className="panel">
          <h2>{records.length}</h2>
          <p>Prescriptions</p>
        </div>

        <div className="panel">
          <h2>
            {
              new Set(
                records.map(
                  (r) => r.patient
                )
              ).size
            }
          </h2>
          <p>Patients</p>
        </div>

        <div className="panel">
          <h2>
            {
              new Set(
                records.map(
                  (r) => r.drug
                )
              ).size
            }
          </h2>
          <p>Drugs Used</p>
        </div>

      </div>

      <div className="panel">

        <h2>New Prescription</h2>

        <input
          placeholder="Attending physician"
          value={doctor}
          onChange={(e) =>
            setDoctor(e.target.value)
          }
        />

        <input
          placeholder="Healthcare facility"
          value={hospital}
          onChange={(e) =>
            setHospital(e.target.value)
          }
        />

        <input
          placeholder="Enter patient name"
          value={patient}
          onChange={(e) =>
            setPatient(e.target.value)
          }
        />

        <input
          placeholder="Patient age"
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
        />

        <select
          value={drug}
          onChange={(e) =>
            setDrug(e.target.value)
          }
        >
          {Object.keys(drugs).map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          value={dosage}
          readOnly
          placeholder="Dosage"
        />

        <input
          placeholder="Treatment days"
          value={days}
          onChange={(e) =>
            setDays(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={calculateDosage}
        >
          Calculate Dosage
        </button>

        <button
          className="primary-btn"
          onClick={savePrescription}
        >
          Save Prescription
        </button>

      </div>

      <div className="panel">

        <h2>Patient Lookup</h2>

        <input
          placeholder="Search patient..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {selectedPatient && (

        <div className="panel">

          <h2>Patient Details</h2>

          <p><b>Name:</b> {selectedPatient.patient}</p>
          <p><b>Age:</b> {selectedPatient.age}</p>
          <p><b>Drug:</b> {selectedPatient.drug}</p>
          <p><b>Dosage:</b> {selectedPatient.dosage}</p>
          <p><b>Doctor:</b> {selectedPatient.doctor}</p>

        </div>

      )}

      <div className="panel">

        <h2>Recent Activity</h2>

        {filteredRecords.map((item) => (

          <div
            key={item.id}
            className="card"
          >
            <h3>{item.patient}</h3>

            <p>{item.drug}</p>

            <p>{item.id}</p>

            <button
              className="primary-btn"
              onClick={() =>
                setSelectedPatient(item)
              }
            >
              View Details
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteRecord(item.id)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}