import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './customize.css';

const bases = ['Crepe', 'Pancake', 'Waffle', 'Churros'];
const toppings = [
  'Strawberries',
  'Banana',
  'Nutella',
  'Caramel',
  'Chocolate Chips',
  'Whipped Cream',
];

const Customize = () => {
  return (
    <motion.div
      className="customize-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Customize Your Dessert
      </motion.h1>

      <div className="options">
        <h2>Choose a Base:</h2>
        <div className="base-options">
          {bases.map((base, index) => (
            <motion.button
              key={index}
              className="base-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {base}
            </motion.button>
          ))}
        </div>

        <h2>Choose Toppings:</h2>
        <div className="topping-options">
          {toppings.map((topping, index) => (
            <motion.button
              key={index}
              className="topping-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {topping}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        className="order-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Add to Cart
      </motion.button>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/menu" className="back-link">
          Back to Menu
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Customize;
