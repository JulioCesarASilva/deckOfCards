import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Baralho from './pages/Baralho';

export function Router() {
    return (
        <Routes>
            {<Route path="" element={<Home />} />}
            {<Route path="/:deck_id&:name" element={<Baralho />} />}
        </Routes>
    )
}