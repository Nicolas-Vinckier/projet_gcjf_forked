import { useEffect } from "react";
import { format, parseISO } from "date-fns";

import loadData from "./../../model/utils/hooks.jsx";

import "./GestionAbs.css";
import "react-calendar/dist/Calendar.css";

export default function SeeAbs() {
  const { loadedData } = loadData("http://localhost:8082/api/absence/all");

  useEffect(() => {
    console.log("data", loadedData);
  }, [loadedData]);

  return (
    <>
      <h1>Gérer les demandes d&apos;absences</h1>
      <div>
        <ul>
          <li>
            <a href="/absence/create">Créer une absence</a>
          </li>
        </ul>
        <div className="absences">
          <h2>Absenses</h2>
          <table>
            <thead>
              <tr>
                <th className="classNum">Numéro de demande</th>
                <th>Motif</th>
                <th className="classDate">Date de début</th>
                <th className="classDate">Date de fin</th>
                <th className="classStatus">status</th>
                <th className="classType">Type</th>
                <th className="classAction">Action</th>
              </tr>
            </thead>
            <tbody>
              {loadedData.map((absence) => (
                <tr key={absence.id}>
                  <td>{absence.id}</td>
                  <td>{absence.motif}</td>
                  <td>{format(parseISO(absence.dt_debut), "dd/MM/yyyy")}</td>
                  <td>{format(parseISO(absence.dt_fin), "dd/MM/yyyy")}</td>
                  <td>{absence.status}</td>
                  <td>{absence.type}</td>
                  <td className="action">
                    {absence.status === "INITIALE" && (
                      <button className="modifier">Modifier</button>
                    )}
                    {absence.status === "INITIALE" && (
                      <button className="supprimer">Supprimer</button>
                    )}
                    {absence.status === "EN_ATTENTE_VALIDATION" && (
                      <span>En attente</span>
                    )}
                    {absence.status === "VALIDEE" && (
                      <span>Demande validée</span>
                    )}
                    {absence.status === "REJETEE" && (
                      <span>Demande refusée</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
