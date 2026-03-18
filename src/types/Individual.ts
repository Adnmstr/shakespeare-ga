export interface Individual {
  genes: string;
  fitness: number;
}

export class IndividualClass implements Individual {
  genes: string;
  fitness: number;

  constructor(genes: string, fitness: number = 0) {
    this.genes = genes;
    this.fitness = fitness;
  }

  static createRandom(length: number, charset: string): IndividualClass {
    let genes = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      genes += charset[randomIndex];
    }
    return new IndividualClass(genes);
  }

  calculateFitness(target: string): void {
    if (target.length === 0) {
      this.fitness = 0;
      return;
    }

    let matches = 0;
    for (let i = 0; i < target.length; i++) {
      if (this.genes[i] === target[i]) {
        matches++;
      }
    }

    this.fitness = matches / target.length;
  }

  mutate(mutationRate: number, charset: string): IndividualClass {
    let mutatedGenes = '';

    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        mutatedGenes += charset[randomIndex];
      } else {
        mutatedGenes += this.genes[i];
      }
    }

    return new IndividualClass(mutatedGenes, this.fitness);
  }

  clone(): IndividualClass {
    return new IndividualClass(this.genes, this.fitness);
  }
}