import React from 'react';
import { IndividualClass } from '../types/Individual';
import '../styles/PopulationDisplay.css';

interface PopulationDisplayProps {
  population: IndividualClass[];
  target: string;
  generation: number;
  bestEver: IndividualClass | null;
  averageFitness: number;
  isComplete: boolean;
}

const highlightGenes = (genes: string, target: string) => {
  return genes.split('').map((char, index) => {
    const isMatch = char === target[index];
    return (
      <span
        key={`${char}-${index}`}
        className={isMatch ? 'char-match' : 'char-miss'}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  });
};

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({
  population,
  target,
  generation,
  bestEver,
  averageFitness,
  isComplete,
}) => {
  const topPopulation = population.slice(0, 15);
  const currentBest = population.length > 0 ? population[0] : null;

  return (
    <div className="population-display">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Generation</h3>
          <p>{generation}</p>
        </div>
        <div className="stat-card">
          <h3>Best Fitness</h3>
          <p>{currentBest ? (currentBest.fitness * 100).toFixed(2) : '0.00'}%</p>
        </div>
        <div className="stat-card">
          <h3>Average Fitness</h3>
          <p>{(averageFitness * 100).toFixed(2)}%</p>
        </div>
      </div>

      <div className="panel-section">
        <h2>Target Phrase</h2>
        <div className="target-box">
          <code>{target || 'No target selected yet.'}</code>
        </div>
      </div>

      <div className="panel-section">
        <h2>Best Individual So Far</h2>
        <div className="best-box">
          {bestEver ? (
            <>
              <div className="genes-line">{highlightGenes(bestEver.genes, target)}</div>
              <div className="fitness-line">
                Fitness: {(bestEver.fitness * 100).toFixed(2)}%
              </div>
            </>
          ) : (
            <p>Start the algorithm to see results.</p>
          )}
        </div>
      </div>

      {isComplete && (
        <div className="complete-banner">
          Solution found: <strong>{bestEver?.genes}</strong>
        </div>
      )}

      <div className="panel-section">
        <h2>Top Population</h2>
        <div className="population-list">
          {topPopulation.map((individual, index) => (
            <div
              key={`${individual.genes}-${index}`}
              className={`population-item ${index === 0 ? 'best-item' : ''}`}
            >
              <div className="population-rank">#{index + 1}</div>
              <div className="population-genes">
                {highlightGenes(individual.genes, target)}
              </div>
              <div className="population-fitness">
                {(individual.fitness * 100).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopulationDisplay;
