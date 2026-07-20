-- Database Schema for User Authentication (US-01)
-- Table: users

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data for testing purposes (passwords hashed with bcrypt, salt rounds = 10)
-- Default password for test users: 'Password123!'
-- Hash generated for 'Password123!': $2a$10$w8.W8z.W8z.W8z.W8z.W8z.W8z.W8z.W8z.W8z.W8z.W8z.W8z
-- (In production, passwords should be created via secure registration flow)
INSERT INTO users (email, password_hash, role)
VALUES 
  ('customer@example.com', '$2a$10$7Z8V48R.e61fVf5U42N2..rX.T5J48e3g/sQ6.h4W1QzN3B3L5X6.', 'customer'),
  ('admin@example.com', '$2a$10$7Z8V48R.e61fVf5U42N2..rX.T5J48e3g/sQ6.h4W1QzN3B3L5X6.', 'admin')
ON CONFLICT (email) DO NOTHING;
