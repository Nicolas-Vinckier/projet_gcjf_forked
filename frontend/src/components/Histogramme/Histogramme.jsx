/**
 * Composant pour afficher un histogramme des absences par jour pour un service sélectionné.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.selectedService - L'identifiant du service sélectionné.
 * @param {number} props.selectedMonth - Le mois sélectionné (0-indexé).
 * @param {number} props.selectedYear - L'année sélectionnée.
 * @returns {JSX.Element} Composant Bar de Chart.js contenant l'histogramme des absences.
 */
import "./Histogramme.css";
import useFetchData from "../../model/utils/hooks";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des échelles et éléments de graphique personnalisés de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Histogramme({
  selectedService,
  selectedMonth,
  selectedYear,
}) {
  /**
   * Classe représentant un ensemble de données pour l'histogramme.
   * @class
   */
  class Dataset {
    /**
     * Crée une instance de Dataset.
     * @constructor
     * @param {string} label - Le label de l'ensemble de données.
     * @param {number[]} data - Les données de l'ensemble de données.
     */
    constructor(label, data) {
      this.label = label;
      this.data = absToList(data);
      let color = label
        .toLowerCase()
        .split("")
        .slice(0, 3)
        .map((letter) => {
          let charcode = letter.charCodeAt(0) - 93;
          return charcode * 9;
        })
        .join();
      this.backgroundColor = "rgba(" + color + ", .7)";
      this.borderColor = "rgb(" + color + ")";
      this.borderWidth = 1;
    }

    /**
     * Convertit l'instance de Dataset en un objet.
     * @returns {Object} L'objet représentant l'ensemble de données.
     */
    toObject() {
      return {
        label: this.label,
        data: this.data,
        backgroundColor: this.backgroundColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
      };
    }
  }

  // Récupération des données d'absence via un hook personnalisé
  const { loadedData } = useFetchData(
    `http://localhost:8082/api/absence/service?id=${selectedService}&month=${
      selectedMonth + 1
    }&year=${selectedYear}`
  );
  let data = loadedData;

  // Création des libellés pour les jours du mois sélectionné
  const daysOfMonth = createLabel(selectedYear, selectedMonth);

  /**
   * Convertit les données d'absence en liste par jour.
   * @param {Object[]} absences - Les données d'absence.
   * @returns {number[]} La liste des absences par jour.
   */
  function absToList(absences) {
    let obj = {};

    for (let i = 1; i <= daysOfMonth.length; i++) {
      let dayOfMonth = new Date(selectedYear, selectedMonth, i);
      for (let abs of absences) {
        let dayOfUser = new Date(abs.dtDebut);
        if (dayOfUser.getDate() == dayOfMonth.getDate()) {
          obj[dayOfMonth] = 1;
        } else continue;
      }
      if (obj[dayOfMonth] == undefined) {
        obj[dayOfMonth] = 0;
      }
    }

    return Array.from(Object.values(obj));
  }

  // Si les données sont chargées, préparer les données pour l'histogramme
  if (loadedData) {
    data = {
      labels: daysOfMonth,
      datasets: loadedData?.map((user) => {
        return new Dataset(user.firstName, user.absences).toObject();
      }),
    };
  }

  /**
   * Crée un tableau de libellés pour les jours du mois.
   * @param {number} year - L'année.
   * @param {number} month - Le mois (0-indexé).
   * @returns {string[]} Le tableau des libellés pour les jours du mois.
   */
  function createLabel(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    let tempArr = [];
    let i = 0;
    while (i < daysInMonth) {
      i++;
      tempArr.push(
        new Date(year, month, i).toString().split("").slice(0, 10).join("")
      );
    }
    return tempArr;
  }

  // Options de configuration pour l'histogramme
  const options = {
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Rendu du composant Bar de Chart.js avec les données et options
  return (
    <>{!!data?.datasets?.length > 0 && <Bar data={data} options={options} />}</>
  );
}
