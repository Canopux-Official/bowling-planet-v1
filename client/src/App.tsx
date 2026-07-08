/**
 * Bowling Planet — App entry point
 * ─────────────────────────────────
 * Set up React Router and routes.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import FranchisePage from './pages/FranchisePage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="franchise" element={<FranchisePage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}
