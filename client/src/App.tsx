/**
 * Bowling Planet — App entry point
 * Nested layout, lazy routes, Helmet for SEO.
 */

import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Layout from './components/Layout'
import { theme } from './theme'

const LandingPage = lazy(() => import('./pages/Landing/LandingPage'))
const AboutPage = lazy(() => import('./pages/About/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'))
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage/ProjectDetailsPage'))
const FranchisePage = lazy(() => import('./pages/Franchise/FranchisePage'))
const JobsPage = lazy(() => import('./pages/JobsPage/JobsPage'))
const JobDetailsPage = lazy(() => import('./pages/JobDetailsPage/JobDetailsPage'))
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'))
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'))
const LoginPage = lazy(() => import('./pages/Login/LoginPage'))
const SignupPage = lazy(() => import('./pages/Signup/SignupPage'))

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.text2,
        padding: 48,
      }}
    >
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailsPage />} />
              <Route path="franchise" element={<FranchisePage />} />
              <Route path="careers" element={<JobsPage />} />
              <Route path="careers/:slug" element={<JobDetailsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogPage />} />
            </Route>

            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
