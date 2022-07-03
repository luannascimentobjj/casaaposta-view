import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

type Repository = {
  listaOdds: [
    {
      ano: string;
      codLiga: number;
      contable: boolean;
      data: string;
      dataCompleta: string;
      hora: number;
      id: number;
      jogo: string;
      minuto: number;
      percentual: number;
      resultado: string;
      resultadoTipo: string;
      sumScore: number;
      timeCasa: string;
      timeVisitante: string;
      tollTip: string;
    }
  ];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type OddsByDate = [
  {
    resultado: string;
    hora: number;
    minuto: number;
    jogo: string;
    timeCasa: string;
    timeVisitante: string;
    data: string;
    ano: string;
    dataCompleta: string;
    id: number;
  }
];

type Hours = [string];

export function Table() {
  const [repo, setRepo] = useState();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");
  const [value7, setValue7] = useState("");
  const [value8, setValue8] = useState("");
  const [value9, setValue9] = useState("");
  const [value10, setValue10] = useState("");
  const [showResult, setShowResult] = useState("none");
  const [resultado, setResultado] = useState("");

  // const [listHour, setListHour] = useState(['']);
  // const [listMinute, setListMinute] = useState([0]);
  const listMinute = [0];
  const listHour = [0];

  function openResult(res: any) {
    setResultado(res);
    setShowResult("");
  }

  let circle = document.getElementById("follow");
  const onMouseMove = (e: any) => {
    if (circle != undefined) {
      circle.style.left = e.pageX + "px";
      circle.style.top = e.pageY + "px";
    }
  };
  document.addEventListener("mousemove", onMouseMove);

  function closeResult() {
    setShowResult("none");
  }

  const { data: result } = useFetch<Repository>(
    "http://191.252.59.151:81/oddsEuroCup/findAllOdds/1/100",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  );

  const { data: resultByDate } = useFetch<OddsByDate>(
    "http://191.252.59.151:81/oddsEuroCup/findByDate/26-02",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  );

  const { data: hours } = useFetch<Hours>(
    "http://191.252.59.151:81/oddsEuroCup/findAllHours/",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  );

  // console.log("Allodss: ", result?.listaOdds);

  result?.listaOdds.map((item) => {
    console.log("odds ", item);
    if (item.minuto !== 0) {
      listMinute.push(item.minuto);
    }
    console.log("Minute ", listMinute);
  });
  listMinute?.sort(function (a: number, b: number) {
    return a - b;
  });
  listMinute.shift();
  console.log("Minute ", listMinute);
  // ################################################
  hours?.map((item) => {
    const numberHour = Number(item);
    listHour.push(numberHour);
    console.log("Hora ", listHour);
  });
  listHour?.sort(function (a: number, b: number) {
    return a - b;
  });
  listHour.shift();
  console.log("Minute ", listHour);

  let i = 0;
  let lastMinute = 0;
  return (
    <>
      <br />
      {/* <h3>Ordenar por hora e depois por minuto</h3> */}
      <table style={{ position: "absolute" }}>
        <thead>
          <th>Hora</th>
          {listMinute.map((minuto) => {
            if (lastMinute !== minuto) {
              lastMinute = minuto;
              return(
                <>
                  <th key={lastMinute} id={'minuto_' + lastMinute.toString()}>{minuto}</th> 
                </>
              )
            }
          })}
        </thead>
        {/* {resultByDate?.map((resultDate) => {
          return (
            <>
              <thead>
                <tr>
                  {listMinute.map((minuto) => {
                    return(
                      <>
                        {minuto === resultDate.minuto &&
                        <th key={resultDate.minuto} id={resultDate.minuto.toString()}>
                        {resultDate.minuto}
                      </th>
                        }
                      </>
                    )
                  })}
                </tr>
              </thead>
            </>
          );
        })} */}

        <tbody>
          {listHour.map((odds) => {
            return (
              <>
                <tr id={odds.toString()}>
                  <td>{odds}</td>

                  {resultByDate?.map((item: any) => {
                    if (lastMinute === item.minuto) {
                      return (
                        <>
                          {odds === item.hora && (
                            <>
                              <td
                                key={item.minuto}
                                onMouseEnter={() => openResult(item.jogo)}
                                onMouseLeave={closeResult}
                                className="td-result"
                              >
                                {item.resultado.replace("-", "x").replace(",", "x").substring(0, 3)}{" "}
                                - {item.hora}:{item.minuto}
                              </td>
                            </>
                          )}
                        </>
                      );
                    }
                   
                  })}
                </tr>
              </>
            );
          })}
          <span id="follow" style={{ display: showResult }}>
            {resultado}
          </span>
        </tbody>
        {/* <tr>
          <td></td>
          <td>{value1}</td>
          <td>{value2}</td>
          <td>{value3}</td>
          <td>{value4}</td>
          <td>{value5}</td>
          <td>{value6}</td>
          <td>{value7}</td>
          <td>{value8}</td>
          <td>{value9}</td>
          <td>{value10}</td>
        </tr> */}

        {/* <tr>
            <th>a</th>
            <td>b</td>
          </tr> */}
      </table>
    </>
  );
}
