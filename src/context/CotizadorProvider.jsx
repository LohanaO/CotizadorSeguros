import { useState, createContext } from "react";
import {
  obtenerDiferenciaYear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);
  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    let resultado = 2000; //Base
    const diferencia = obtenerDiferenciaYear(datos.year); //obtener diferencia de años
    resultado -= (diferencia * 3 * resultado) / 100; //Hay que restar el 3% por cada año
    resultado *= calcularMarca(datos.marca); // Americano 15%, Europeo 30%, Asiatico 5%
    resultado *= calcularPlan(datos.plan); //Plan Basico 20%, Completo 50%
    resultado = formatearDinero(resultado); //Formatear Dinero

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setResultado(resultado);
    }, 3000)
   
  }

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
