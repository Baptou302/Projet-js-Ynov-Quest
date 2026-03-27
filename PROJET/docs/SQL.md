CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE worlds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    world_key VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);


INSERT INTO worlds (world_key, name) VALUES
('archives', 'Les Archives Perdues'),
('network', 'La Zone Réseau'),
('sql', 'La Base Centrale');

CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    level_id INT NOT NULL,
    world VARCHAR(20) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    attempts INT DEFAULT 0,
    UNIQUE KEY unique_user_level (user_id, level_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_world_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    world_id INT NOT NULL,
    levels_completed INT DEFAULT 0,
    UNIQUE KEY unique_user_world (user_id, world_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (world_id) REFERENCES worlds(id)
);

CREATE INDEX idx_user_progress ON user_progress(user_id, world);
CREATE INDEX idx_user_world ON user_world_progress(user_id);