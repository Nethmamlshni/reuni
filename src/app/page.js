"use client";


import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/src/features/home/components/Hero";
import FAQ from "@/src/features/home/components/FAQ";

export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <FAQ/>
            <Footer/>
        </>
    );
}
