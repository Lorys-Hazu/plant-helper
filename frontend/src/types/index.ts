export interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  plants: Plant[];
  tasks: Task[];
}

export interface Plant {
  id: number;
  name: string;
  species: string;
  currentStatus: PlantStatus;
  currentStatusId: number;
  statusHistory: StatusHistory[];
  owner: User;
  ownerId: number;
  tasks: Task[];
}

export interface PlantStatus {
  id: number;
  status: string;
  description?: string;
  affectedPlants: Plant[];
  previousStatusHistory: StatusHistory[];
  newStatusHistory: StatusHistory[];
}

export interface StatusHistory {
  id: number;
  plant: Plant;
  plantId: number;
  previousStatus: PlantStatus;
  previousStatusId: number;
  newStatus: PlantStatus;
  newStatusId: number;
  changedAt: Date;
}

export interface Task {
  id: number;
  type: TaskType;
  description?: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  plant: Plant;
  plantId: number;
  owner: User;
  ownerId: number;
}

export enum TaskType {
  WATER = "WATER",
  FERTILIZE = "FERTILIZE",
  PRUNE = "PRUNE",
  REPOT = "REPOT",
  MIST = "MIST",
  CLEAN = "CLEAN",
  OTHER = "OTHER",
}
