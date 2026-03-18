import { IndividualClass } from '../types/Individual';

export interface GAConfig {
  populationSize: number;
  mutationRate: number;   // 0.01 = 1%
  crossoverRate: number;  // 0.8 = 80%
  elitismCount: number;
  tournamentSize: number;
  charset: string;
}

export class GeneticAlgorithm {
  private config: GAConfig;
  private population: IndividualClass[];
  private generation: number;
  private target: string;
  private bestEver: IndividualClass | null;

  constructor(config: GAConfig) {
    this.config = config;
    this.population = [];
    this.generation = 0;
    this.target = '';
    this.bestEver = null;
  }

  initialize(target: string): void {
    this.target = target;
    this.generation = 0;
    this.bestEver = null;
    this.population = [];

    for (let i = 0; i < this.config.populationSize; i++) {
      const individual = IndividualClass.createRandom(
        target.length,
        this.config.charset
      );
      individual.calculateFitness(target);
      this.population.push(individual);
    }

    this.sortPopulation();
    this.updateBestEver();
  }

  evolve(): void {
    if (!this.target || this.population.length === 0) return;

    for (const individual of this.population) {
      individual.calculateFitness(this.target);
    }

    this.sortPopulation();
    this.updateBestEver();

    const newPopulation: IndividualClass[] = [];

    const eliteCount = Math.min(this.config.elitismCount, this.population.length);
    for (let i = 0; i < eliteCount; i++) {
      newPopulation.push(this.population[i].clone());
    }

    while (newPopulation.length < this.config.populationSize) {
      const parent1 = this.selectParent();
      const parent2 = this.selectParent();

      let children: IndividualClass[];

      if (Math.random() < this.config.crossoverRate) {
        children = this.crossover(parent1, parent2);
      } else {
        children = [parent1.clone(), parent2.clone()];
      }

      for (const child of children) {
        const mutatedChild = child.mutate(this.config.mutationRate, this.config.charset);
        mutatedChild.calculateFitness(this.target);

        newPopulation.push(mutatedChild);

        if (newPopulation.length >= this.config.populationSize) {
          break;
        }
      }
    }

    this.population = newPopulation;
    this.sortPopulation();
    this.updateBestEver();
    this.generation++;
  }

  private sortPopulation(): void {
    this.population.sort((a, b) => b.fitness - a.fitness);
  }

  private updateBestEver(): void {
    if (this.population.length === 0) return;

    const currentBest = this.population[0];
    if (!this.bestEver || currentBest.fitness > this.bestEver.fitness) {
      this.bestEver = currentBest.clone();
    } else if (
      this.bestEver &&
      currentBest.fitness === this.bestEver.fitness &&
      currentBest.genes === this.target
    ) {
      this.bestEver = currentBest.clone();
    }
  }

  private selectParent(): IndividualClass {
    let best: IndividualClass | null = null;

    for (let i = 0; i < this.config.tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * this.population.length);
      const contender = this.population[randomIndex];

      if (!best || contender.fitness > best.fitness) {
        best = contender;
      }
    }

    return best!.clone();
  }

  private crossover(
    parent1: IndividualClass,
    parent2: IndividualClass
  ): IndividualClass[] {
    const length = parent1.genes.length;

    if (length <= 1) {
      return [parent1.clone(), parent2.clone()];
    }

    const crossoverPoint = Math.floor(Math.random() * (length - 1)) + 1;

    const child1Genes =
      parent1.genes.slice(0, crossoverPoint) +
      parent2.genes.slice(crossoverPoint);

    const child2Genes =
      parent2.genes.slice(0, crossoverPoint) +
      parent1.genes.slice(crossoverPoint);

    return [new IndividualClass(child1Genes), new IndividualClass(child2Genes)];
  }

  getPopulation(): IndividualClass[] {
    return [...this.population];
  }

  getGeneration(): number {
    return this.generation;
  }

  getBestIndividual(): IndividualClass | null {
    return this.population.length > 0 ? this.population[0] : null;
  }

  getBestEver(): IndividualClass | null {
    return this.bestEver ? this.bestEver.clone() : null;
  }

  getAverageFitness(): number {
    if (this.population.length === 0) return 0;

    const total = this.population.reduce((sum, individual) => sum + individual.fitness, 0);
    return total / this.population.length;
  }

  getTarget(): string {
    return this.target;
  }

  isComplete(): boolean {
    const best = this.getBestIndividual();
    return best !== null && best.genes === this.target;
  }
}