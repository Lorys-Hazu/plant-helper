import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
export declare class PlantsService {
    private readonly db;
    constructor(db: DatabaseService);
    create(createPlantDto: Prisma.PlantCreateInput): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
        ownerId: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
        ownerId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
        ownerId: number;
    }>;
    update(id: number, updatePlantDto: Prisma.PlantUpdateInput): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
        ownerId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
        ownerId: number;
    }>;
}