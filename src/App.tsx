
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RecruiterRoute from "@/components/auth/RecruiterRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import Index from "@/pages/Index";
import SearchPage from "@/pages/SearchPage";
import JobsPage from "@/pages/JobsPage";
import CompaniesPage from "@/pages/CompaniesPage";
import CompanyDetailsPage from "@/pages/CompanyDetailsPage";
import JobDetailsPage from "@/pages/JobDetailsPage";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";
import PostJobPage from "@/pages/PostJobPage";
import ManageJobsPage from "@/pages/ManageJobsPage";
import EditJobPage from "@/pages/EditJobPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoute>
                      <JobsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id"
                  element={
                    <ProtectedRoute>
                      <JobDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/companies"
                  element={
                    <ProtectedRoute>
                      <CompaniesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/companies/:id"
                  element={
                    <ProtectedRoute>
                      <CompanyDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/post-job"
                  element={
                    <RecruiterRoute>
                      <PostJobPage />
                    </RecruiterRoute>
                  }
                />
                <Route
                  path="/manage-jobs"
                  element={
                    <RecruiterRoute>
                      <ManageJobsPage />
                    </RecruiterRoute>
                  }
                />
                <Route
                  path="/edit-job/:id"
                  element={
                    <RecruiterRoute>
                      <EditJobPage />
                    </RecruiterRoute>
                  }
                />
                {/* Example of how to use AdminRoute for an admin-only page */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <div className="container-custom py-12">
                        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                        <p>This page is only accessible to administrators.</p>
                      </div>
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
