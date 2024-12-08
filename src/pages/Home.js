import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import LeadPopup from '../components/LeadPopup';
import SEO from '../components/SEO';
const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "Pedro Palomares - Digital Coach", description: "Experto en automatizaci\u00F3n, IA y desarrollo web. Ayudo a empresas a escalar sus negocios mediante estrategias digitales." }), _jsx(Hero, {}), _jsx(Services, {}), _jsx(About, {}), _jsx(Portfolio, {}), _jsx(LeadPopup, {})] }));
};
export default Home;
