import axios from "axios";
import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import "../styles/Table.css";

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

type Hours = [string];

function Home() {
  const [repo, setRepo] = useState();
  // const [listHour, setListHour] = useState(['']);
  // const [listMinute, setListMinute] = useState([0]);
  const listMinute = [0];
  const listHour = [0];

  const { data: result } = useFetch<Repository>(
    "http://191.252.59.151:81/oddsEuroCup/findAllOdds/1/10",
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

  result?.listaOdds.map(item => {
    listMinute.push(item.minuto)
  })
  listMinute?.sort(function (a:number, b:number) { return a - b})

  hours?.map(item => {
    const numberHour = Number(item);
    listHour.push(numberHour);
    console.log('Hora ', listHour)
  })
  listHour?.sort(function (a:number, b:number) { return a - b})


  //  console.log('teste ', numberHour)
  // const orderHour = numberHour?.sort(function (a:number, b:number) { return a.localeCompare(b)})
  // console.log('teste ', data?);
  // const [data, setData] = useState();

  // function Resultados() {
  //   return axios
  //     .get("http://191.252.59.151:81/oddsEuroCup/findAllOdds/1/10", {
  //       headers: {
  //         "Authorization": "Bearer " + localStorage.getItem("token"),
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setRepo(response.data)
  //         console.log(response);
  //       } else {
  //         console.log("erro");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <>
      <div>
        <select name="cars" id="cars">
          <option value="volvo">Tipo</option>
          <option value="volvo">Data</option>
          <option value="volvo">Partida</option>
          <option value="volvo">Time da Casa</option>
          <option value="volvo">Time Visitante</option>
          <option value="volvo">Time Visitante e Casa</option>
        </select>
      </div>
      <br />

      <h1>Teste</h1>
      {console.log("data: ", hours == null ? null : hours)}

      <table>
        <thead>
          <tr>
            <th className="fixed-table-content"></th>
            {listMinute.map((minute) => {
              return <th key={minute} id={minute.toString()}>{minute}</th>;
            })}
          </tr>

          <th className="fixed-table-content">HORA</th>
          {listHour?.map((hour: any) => {
            const teste = document.getElementById(`${hour}`)?.innerText;
            return (
              <tr key={hour}>
                <th id={hour}>{hour}:00</th>
                {result?.listaOdds.map(odds => {
                  // debugger;

                  const teste2 = odds.resultado;
                  const horaId = document.getElementById(`${hour}`)?.id
                  return(
                    <td key={hour} >
                      {/* {item.timeCasa.substring(0, 3).toUpperCase()}&nbsp;x&nbsp;
                      {item.timeVisitante.substring(0, 3).toUpperCase()} <br />
                      {item.resultado} */}

                      {/* Pegar o tamanho da lista e adicionar a quanidade de td, com uma key[hora, min] */}

                      {/* dentro do td, um if verificando o resultado da lista de odds bate com o resutado da key */}

                      {horaId == odds.hora.toString() && (
                        odds.resultado
                      )}

                      {/* {(teste == `${odd}:00`) &&
                        'a'
                      } */}
                    </td>
                  )
                })}
              </tr>
            );
          })}
        </thead>

        {/* <tbody>
          <tr>
            {result?.listaOdds.map((odd) => {
              return (
                <th>
                  {odd.timeCasa.substring(0, 3).toUpperCase()}&nbsp;x&nbsp;
                  {odd.timeVisitante.substring(0, 3).toUpperCase()} <br />
                  {odd.resultado}
                </th>
              );
            })}
          </tr>
        </tbody> */}
        <tr></tr>
      </table>
    </>
  );
}

export default Home;
