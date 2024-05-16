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
  class Dataset {
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
  const { loadedData } = useFetchData(
    `http://localhost:8082/api/absence/service?id=${selectedService}&month=${
      selectedMonth + 1
    }&year=${selectedYear}`
  );
  let data = loadedData;
  const daysOfMonth = createLabel(selectedYear, selectedMonth);

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

  if (loadedData) {
    data = {
      labels: daysOfMonth,
      datasets: loadedData?.map((user) => {
        return new Dataset(user.firstName, user.absences).toObject();
      }),
    };
  }

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

  return (
    <>{!!data?.datasets?.length > 0 && <Bar data={data} options={options} />}</>
  );
}
