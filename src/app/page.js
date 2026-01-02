"use client";


import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/src/features/home/components/Hero";
import FAQ from "@/src/features/home/components/FAQ";
import Features from "@/src/features/home/components/Features";
import About from "@/src/features/home/components/About";
import CTA from "@/src/features/home/components/CTA";

export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Features/>
            <FAQ/>
            <About/>
            <CTA/>
            <Footer/>

        </>
    );
}
