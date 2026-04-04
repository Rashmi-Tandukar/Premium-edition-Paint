import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopProducts from './components/TopProducts'
import Features from './components/features'
import Stats from './components/stats'
import HowItWorks from './components/howitworks'
import Testimonials from './components/testimonials'
import FAQ from './components/faq'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopProducts />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <Footer />
    </>
  )
}