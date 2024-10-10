# Flappy Bird AI using ANN and Genetic Algorithm
This project implements a simulation of the Flappy Bird game, where an Artificial Neural Network (ANN) is trained to play the game using a Genetic Algorithm. The goal is to create an AI that can learn to avoid obstacles (pipes) and survive longer as it progresses through generations.

## Key Features:
* Neural Network (ANN) Training: The birds (agents) use an ANN to make decisions based on input data, such as the bird's position, the distance to the next obstacle, and other environmental factors. The network processes these inputs and decides whether the bird should flap or stay still.
* Genetic Algorithm Optimization: After each generation of birds, the best performers are selected, and their weights are used to mutate the next generation's neural networks. This way, the system evolves over time, improving the birds' ability to survive.
* Real-Time Simulation: The simulation visually displays the birds' movement and decision-making in real time, showing their performance and the obstacles they encounter.
* Interactive Learning: The simulation provides an engaging way to learn about AI, neural networks, and genetic algorithms by visualizing how different generations of birds perform better through evolution.

## Technologies Used:
* JavaScript for the game logic and simulation.
* HTML/CSS for the user interface and visual elements.
* Custom Neural Network Implementation for training birds using a feedforward network with multiple layers.
* Genetic Algorithm for optimizing the neural network weights over generations.

This project offers an exciting combination of AI and game development, providing a fun and educational way to understand machine learning concepts.
