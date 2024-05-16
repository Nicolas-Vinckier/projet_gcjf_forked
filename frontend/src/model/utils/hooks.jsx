/**
 * Un hook personnalisé pour récupérer des données depuis une URL spécifiée.
 * @param {string} url - L'URL à partir de laquelle récupérer les données.
 * @returns {Object} Un objet contenant les données chargées et l'état de chargement.
 */
import { useEffect, useState } from "react";

export default function useFetchData(url = "") {
  /**
   * État local pour stocker les données chargées depuis l'URL.
   * @type {[Array, Function]}
   */
  const [loadedData, setData] = useState([]);
  /**
   * État local pour indiquer si les données sont en cours de chargement.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /**
     * Fonction pour charger les données depuis l'URL.
     * @async
     */
    async function loadData() {
      setLoading(true);
      const res = await fetch(url, { credentials: "include" });
      try {
        if (res.ok) {
          const dataReceived = await res.json();
          if (dataReceived) {
            setData(dataReceived);
            setLoading(false);
          } else {
            console.log("pas de data");
          }
        }
      } catch (e) {
        console.error("Impossible de récupérer la resource");
      }
    }

    loadData();
  }, [url]);

  // Retourne les données chargées et l'état de chargement
  return { loadedData, loading };
}
