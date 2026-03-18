import React, { useMemo, useState } from 'react';
import '../styles/ControlPanel.css';
import { GAConfig } from '../algorithms/GeneticAlgorithm';

interface ControlPanelProps {
  onStart: (target: string, config: GAConfig) => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
  isComplete: boolean;
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';

const quotes = [
  'TO BE OR NOT TO BE',
  'ALL THAT GLITTERS IS NOT GOLD',
  'THE LADY DOTH PROTEST TOO MUCH',
  'BREVITY IS THE SOUL OF WIT',
  'SOME ARE BORN GREAT',
  'LOVE LOOKS NOT WITH THE EYES',
  'IF MUSIC BE THE FOOD OF LOVE',
  'WE ARE SUCH STUFF AS DREAMS',
  'THE COURSE OF TRUE LOVE',
  'THIS ABOVE ALL TO THINE OWN SELF BE TRUE'
];

const ControlPanel: React.FC<ControlPanelProps> = ({
  onStart,
  onStop,
  onReset,
  isRunning,
  isComplete
}) => {
  const [selectedQuote, setSelectedQuote] = useState(quotes[0]);
  const [customMode, setCustomMode] = useState(false);
  const [customTarget, setCustomTarget] = useState('HELLO WORLD');

  const [populationSize, setPopulationSize] = useState(200);
  const [mutationRatePercent, setMutationRatePercent] = useState(1);
  const [crossoverRatePercent, setCrossoverRatePercent] = useState(80);
  const [elitismCount, setElitismCount] = useState(2);
  const [tournamentSize, setTournamentSize] = useState(5);

  const target = useMemo(() => {
    const raw = customMode ? customTarget : selectedQuote;
    return raw.toUpperCase().replace(/[^A-Z ]/g, '');
  }, [customMode, customTarget, selectedQuote]);

  const handleStart = () => {
    const cleanedTarget = target.trim().replace(/\s+/g, ' ');
    if (!cleanedTarget) return;

    const config: GAConfig = {
      populationSize,
      mutationRate: mutationRatePercent / 100,
      crossoverRate: crossoverRatePercent / 100,
      elitismCount,
      tournamentSize,
      charset: DEFAULT_CHARSET
    };

    onStart(cleanedTarget, config);
  };

  return (
    <div className="control-panel">
      <h2>Genetic Algorithm Controls</h2>

      <div className="control-group">
        <label>Target Type</label>
        <div className="toggle-row">
          <button
            className={!customMode ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setCustomMode(false)}
            type="button"
          >
            Shakespeare Quote
          </button>
          <button
            className={customMode ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setCustomMode(true)}
            type="button"
          >
            Custom Phrase
          </button>
        </div>
      </div>

      {!customMode ? (
        <div className="control-group">
          <label htmlFor="quoteSelect">Choose Quote</label>
          <select
            id="quoteSelect"
            value={selectedQuote}
            onChange={(e) => setSelectedQuote(e.target.value)}
            disabled={isRunning}
          >
            {quotes.map((quote) => (
              <option key={quote} value={quote}>
                {quote}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="control-group">
          <label htmlFor="customTarget">Custom Target</label>
          <input
            id="customTarget"
            type="text"
            value={customTarget}
            onChange={(e) => setCustomTarget(e.target.value)}
            disabled={isRunning}
            placeholder="Enter target phrase"
          />
          <small>Only A-Z and spaces are used.</small>
        </div>
      )}

      <div className="control-group">
        <label htmlFor="populationSize">Population Size: {populationSize}</label>
        <input
          id="populationSize"
          type="range"
          min="50"
          max="500"
          step="10"
          value={populationSize}
          onChange={(e) => setPopulationSize(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>

      <div className="control-group">
        <label htmlFor="mutationRate">Mutation Rate: {mutationRatePercent}%</label>
        <input
          id="mutationRate"
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={mutationRatePercent}
          onChange={(e) => setMutationRatePercent(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>

      <div className="control-group">
        <label htmlFor="crossoverRate">Crossover Rate: {crossoverRatePercent}%</label>
        <input
          id="crossoverRate"
          type="range"
          min="0"
          max="100"
          step="1"
          value={crossoverRatePercent}
          onChange={(e) => setCrossoverRatePercent(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>

      <div className="row-grid">
        <div className="control-group">
          <label htmlFor="elitismCount">Elitism Count</label>
          <input
            id="elitismCount"
            type="number"
            min="0"
            max="10"
            value={elitismCount}
            onChange={(e) => setElitismCount(Number(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <div className="control-group">
          <label htmlFor="tournamentSize">Tournament Size</label>
          <input
            id="tournamentSize"
            type="number"
            min="2"
            max="10"
            value={tournamentSize}
            onChange={(e) => setTournamentSize(Number(e.target.value))}
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="target-preview">
        <span className="preview-label">Current Target:</span>
        <code>{target || '(empty)'}</code>
      </div>

      <div className="button-row">
        <button onClick={handleStart} disabled={isRunning || !target.trim()}>
          Start
        </button>
        <button onClick={onStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={onReset}>
          Reset
        </button>
      </div>

      {isComplete && (
        <div className="status success">
          Evolution complete.
        </div>
      )}
    </div>
  );
};

export default ControlPanel;