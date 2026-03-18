import React, { useEffect, useRef } from 'react';
import '../styles/FitnessChart.css';

export interface DataPoint {
  generation: number;
  bestFitness: number;
  averageFitness: number;
}

interface FitnessChartProps {
  data: DataPoint[];
}

const FitnessChart: React.FC<FitnessChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.strokeStyle = '#d0d7de';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('100%', 8, padding + 4);
    ctx.fillText('0%', 18, height - padding + 4);
    ctx.fillText('Fitness', 8, 20);
    ctx.fillText('Generation', width / 2 - 30, height - 10);

    if (data.length < 2) return;

    const maxGeneration = Math.max(...data.map((d) => d.generation), 1);

    const xFor = (generation: number) =>
      padding + (generation / maxGeneration) * chartWidth;

    const yFor = (fitness: number) =>
      height - padding - fitness * chartHeight;

    ctx.strokeStyle = '#1f77b4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = xFor(point.generation);
      const y = yFor(point.bestFitness);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.strokeStyle = '#ff7f0e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = xFor(point.generation);
      const y = yFor(point.averageFitness);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = '#1f77b4';
    ctx.fillRect(width - 170, 18, 12, 12);
    ctx.fillStyle = '#333';
    ctx.fillText('Best Fitness', width - 150, 28);

    ctx.fillStyle = '#ff7f0e';
    ctx.fillRect(width - 170, 38, 12, 12);
    ctx.fillStyle = '#333';
    ctx.fillText('Average Fitness', width - 150, 48);
  }, [data]);

  return (
    <div className="fitness-chart">
      <h2>Fitness Progress</h2>
      <canvas ref={canvasRef} width={900} height={320} />
    </div>
  );
};

export default FitnessChart;