import React from 'react';
import heroImg from '../assets/hero.png';
import { mockDb } from '../data/mockDb';

const Hero = () => {
  const { hero } = mockDb;
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <img src={heroImg} alt="Futuristic Travel Background" />
        <div className="overlay"></div>
      </div>
      
      <div className="container hero-content centered">
        <div className="hero-text-container">
          <div className="hero-badge animate-up">{hero.badge}</div>
          <p className="hero-subtext animate-up delay-1">{hero.title[0]}</p>
          <h1 className="hero-main-title animate-up delay-2">
            <span className="highlight">{hero.title[1]}</span>
          </h1>
          <p className="hero-description animate-up delay-3">{hero.description}</p>
          
          <div className="hero-cta animate-up delay-4">
            <button className="btn-primary">{hero.cta.primary}</button>
            <button className="btn-secondary">{hero.cta.secondary}</button>
          </div>
        </div>

        <div className="hero-stats-row animate-up delay-5">
          {hero.stats.map((stat, index) => (
            <div key={index} className="stat-pill glass-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
