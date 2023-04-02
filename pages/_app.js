import '@/styles/globals.css'
import { NFTMarketplaceProvider } from '../Context/NFTMarketplaceContext'
import { NavBar, Footer } from "../components/componentindex"






const App = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
    <NavBar/>
    <Component {...pageProps} />  
    <Footer />
    </NFTMarketplaceProvider>

  </div>
)

export default App