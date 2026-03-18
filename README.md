# Shakespeare Genetic Algorithm

## Overview

This project is a React + TypeScript application that demonstrates a **Genetic Algorithm (GA)** evolving random text into a target phrase. The application visually shows how evolutionary algorithms can solve optimization problems by gradually improving a population of candidate solutions.

Instead of brute-forcing every possible string combination, the genetic algorithm evolves a population through **selection, crossover, and mutation** until the correct phrase emerges.

The target phrases are typically Shakespeare quotes, which makes the evolution process easy to visualize and understand.

Example evolution:

Generation 0
```
XQ WK ZP MLQ XZ WK
```

Generation 120
```
TO BE OR NPT TO BE
```

Generation 220
```
TO BE OR NOT TO BE
```

---

# Learning Objectives

This activity demonstrates several important concepts:

- Genetic Algorithms and evolutionary computation
- Optimization in very large search spaces
- Natural Language Processing string similarity
- React UI visualization of algorithm progress
- Real-time algorithm performance monitoring

---

# Why Genetic Algorithms Work Here

The phrase:

```
TO BE OR NOT TO BE
```

has approximately:

```
27^18 ≈ 7.6 × 10^25
```

possible combinations.

A brute-force search at **1 billion guesses per second** would take billions of years.

Genetic algorithms dramatically reduce the search time by:

1. Keeping the best solutions
2. Combining good solutions
3. Introducing small random mutations
4. Repeating this process across generations

Most runs solve the phrase within **200-500 generations**.

---

# Architecture

The application is composed of several core components.

## Genetic Algorithm Core

The algorithm is implemented directly in the application and runs in the browser.

There is **no pretrained model**. The algorithm evolves solutions dynamically during execution.

### Individual

Represents one candidate string.

```
genes: string
fitness: number
```

Functions implemented:

- createRandom()
- calculateFitness()
- mutate()

### GeneticAlgorithm

Controls the evolution process.

Responsibilities:

- population management
- fitness evaluation
- selection
- crossover
- mutation
- elitism

---

# Application Structure

```
shakespeare-ga
│
├── public
│
├── src
│   ├── algorithms
│   │   └── GeneticAlgorithm.ts
│   │
│   ├── components
│   │   ├── ControlPanel.tsx
│   │   ├── PopulationDisplay.tsx
│   │   └── FitnessChart.tsx
│   │
│   ├── styles
│   │   ├── ControlPanel.css
│   │   ├── PopulationDisplay.css
│   │   └── FitnessChart.css
│   │
│   ├── types
│   │   └── Individual.ts
│   │
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
│
├── package.json
└── README.md
```

---

# Features

The application provides several visualization features:

### Control Panel
Allows users to configure:

- Target phrase
- Population size
- Mutation rate
- Elitism count

Controls include:

- Start evolution
- Stop evolution
- Reset simulation

---

### Population Display

Displays:

- Current generation number
- Best fitness score
- Average population fitness
- Best individual so far
- Top population candidates

Matching characters are color coded to visualize progress.

---

### Fitness Chart

A real-time chart displays:

- Best fitness over generations
- Average fitness over generations

This helps visualize algorithm convergence.

---

# Running the Application

## Install dependencies

From the project directory:

```
npm install
```

## Start development server

```
npm start
```

The application will open automatically at:

```
http://localhost:3000
```

---

# Testing the Algorithm

Try experimenting with:

### Different phrase lengths

Short phrases converge quickly:

```
HELLO
```

Medium phrases:

```
TO BE OR NOT TO BE
```

Long phrases:

```
ALL THE WORLD'S A STAGE
```

### Adjust mutation rate

Typical values:

```
0.5% – 2%
```

Higher mutation rates increase diversity but slow convergence.

---

# Deployment

This project can be deployed as a static web application.

## Build production version

```
npm run build
```

---

## Deploy with Vercel

Install the CLI:

```
npm install -g vercel
```

Deploy:

```
vercel --prod
```

Your app will be deployed to a public URL.

---

## Deploy with Render

1. Push the project to GitHub
2. Go to https://render.com
3. Create a **Static Site**
4. Configure:

Build Command
```
npm install && npm run build
```

Publish Directory
```
build
```

---

# Performance Observations

Typical results:

| Population | Mutation | Generations |
|------------|----------|-------------|
| 100        | 1%       | ~400        |
| 200        | 1%       | ~250        |
| 500        | 1%       | ~150        |

Increasing population size usually improves convergence speed.

---

# Challenges Encountered

A common issue when implementing genetic algorithms is balancing:

- mutation rate
- selection pressure
- population diversity

If mutation is too low, evolution can get stuck in local optima.

If mutation is too high, the algorithm behaves like random search.

---

# Possible Improvements

Future extensions could include:

- multiple crossover strategies
- roulette-wheel selection
- adaptive mutation rates
- parallel population evolution
- exporting evolution statistics
- WebWorker background evolution

---

# Technologies Used

- React
- TypeScript
- HTML5 Canvas
- CSS3
- Genetic Algorithms

---

# Author

AIT-204 Genetic Algorithms Activity  
Grand Canyon University