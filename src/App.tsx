import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TrailerPools } from './pages/TrailerPools';
import { NetworkDesign } from './pages/NetworkDesign';
import { CostConfiguration } from './pages/CostConfiguration';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/trailer-pools" element={<TrailerPools />} />
          <Route path="/network-design" element={<NetworkDesign />} />
          <Route path="/cost-configuration" element={<CostConfiguration />} />
          <Route path="*" element={<Navigate to="/trailer-pools" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}