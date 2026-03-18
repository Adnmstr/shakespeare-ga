import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { GeneticAlgorithm, GAConfig } from './algorithms/GeneticAlgorithm';
import { IndividualClass } from './types/Individual';
import ControlPanel from './components/ControlPanel';
import PopulationDisplay from './components/PopulationDisplay';
import FitnessChart, { DataPoint } from './components/FitnessChart';

function App() {
  const [ga, setGa] = useState<GeneticAlgorithm | null>(null);
  const [population, setPopulation] = useState<IndividualClass[]>([]);
  const [generation, setGeneration] = useState(0);
  const [target, setTarget] = useState('');
  const [bestEver, setBestEver] = useState<IndividualClass | null>(null);
  const [averageFitness, setAverageFitness] = useState(0);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const syncFromGA = (gaInstance: GeneticAlgorithm) => {
    const currentPopulation = gaInstance.getPopulation();
    const currentBest = gaInstance.getBestEver();
    const currentGeneration = gaInstance.getGeneration();
    const currentAverage = gaInstance.getAverageFitness();
    const currentTop = gaInstance.getBestIndividual();

    setPopulation(currentPopulation);
    setGeneration(currentGeneration);
    setBestEver(currentBest);
    setAverageFitness(currentAverage);
    setIsComplete(gaInstance.isComplete());

    setChartData((prev) => [
      ...prev,
      {
        generation: currentGeneration,
        bestFitness: currentTop?.fitness ?? 0,
        averageFitness: currentAverage,
      },
    ]);
  };

  const stopEvolution = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const startEvolution = (newTarget: string, config: GAConfig) => {
    stopEvolution();

    const gaInstance = new GeneticAlgorithm(config);
    gaInstance.initialize(newTarget);

    setGa(gaInstance);
    setTarget(newTarget);
    setChartData([]);
    setIsComplete(false);
    syncFromGA(gaInstance);
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      gaInstance.evolve();
      syncFromGA(gaInstance);

      if (gaInstance.isComplete()) {
        stopEvolution();
      }
    }, 35);
  };

  const resetEvolution = () => {
    stopEvolution();
    setGa(null);
    setPopulation([]);
    setGeneration(0);
    setTarget('');
    setBestEver(null);
    setAverageFitness(0);
    setChartData([]);
    setIsComplete(false);
  };

  useEffect(() => {
    return () => {
      stopEvolution();
    };
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Shakespeare Genetic Algorithm</h1>
        <p>
          Evolve random text into Shakespeare-style target phrases using
          selection, crossover, mutation, and elitism.
        </p>
      </header>

      <main className="app-main">
        <section className="left-column">
          <ControlPanel
            onStart={startEvolution}
            onStop={stopEvolution}
            onReset={resetEvolution}
            isRunning={isRunning}
            isComplete={isComplete}
          />
        </section>

        <section className="right-column">
          <PopulationDisplay
            population={population}
            target={target}
            generation={generation}
            bestEver={bestEver}
            averageFitness={averageFitness}
            isComplete={isComplete}
          />
          <FitnessChart data={chartData} />
        </section>
      </main>

      <footer className="app-footer">
        <div>
          <strong>Status:</strong>{' '}
          {isRunning
            ? 'Running'
            : isComplete
            ? 'Complete'
            : ga
            ? 'Stopped'
            : 'Ready'}
        </div>
      </footer>
    </div>
  );
}

export default App;