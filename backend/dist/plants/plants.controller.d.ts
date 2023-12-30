import { PlantsService } from './plants.service';
import { Prisma } from '@prisma/client';
export declare class PlantsController {
    private readonly plantsService;
    constructor(plantsService: PlantsService);
    create(createPlantDto: Prisma.PlantCreateInput): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
    }>;
    update(id: string, updatePlantDto: Prisma.PlantUpdateInput): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        species: string;
        currentStatusId: number;
    }>;
}
