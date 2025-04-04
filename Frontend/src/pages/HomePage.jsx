import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import axios from 'axios';
import CategorySection from "../components/CategorySection";

export default function HomePage() {
 



    return (
        <>
            <h1 className="text-center py-3">Kick Shop</h1>

            <HeroSection />
            <CategorySection />



            {/* <h2 className="text-center">Tutta la collezione</h2>

<div className="mx-5 mb-5">
<div className="row row-cols-lg-4">
{renderProducts()}
</div>
</div> */}
        </>
    )
}