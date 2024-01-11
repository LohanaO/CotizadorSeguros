import Appseguro from "./components/Appseguro"
import { CotizadorProvider } from "./context/CotizadorProvider"
function App() {
 
  return (
    <>
     <CotizadorProvider>
     <Appseguro />
     </CotizadorProvider>
    </>
  )
}

export default App
