export interface User{
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput{
  name: string;
  email: string;
  password: string;
}

export interface Specie {
  id: string;
  commonName: string;
  specieDescription: string;
  scientificName: string;
  botanicalFamily: string;
  growthType: string;
  idealTemperature: number;
  idealClimate: string;
  lifeCycle: string;
  plantingSeason: string;
  harvestTime: number;
  averageHeight: number;
  averageWidth: number;
  irrigationWeight: number;
  fertilizationWeight: number;
  sunWeight: number;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plant{
  id: string;
  plantName: string;
  plantDescription: string;
  plantingDate: Date;
  estimatedHarvestDate: Date;
  plantStatus: string;
  currentHeight: number;
  currentWidth: number;
  irrigationWeek: number;
  healthStatus: string;
  lastIrrigation: Date;
  lastFertilization: Date;
  sunExposure: number;
  fertilizationWeek: number;
  userId: string;
  speciesId: string;
  createdAt: Date;
  updatedAt: Date;
  categoriesPlantIds: string[];
}

export interface PlantInput{
  plantName: string;
  plantDescription: string;
  plantingDate: Date;
  estimatedHarvestDate: Date;
  plantStatus: string;
  currentHeight: number;
  currentWidth: number;
  irrigationWeek: number;
  healthStatus: string;
  lastIrrigation: Date;
  lastFertilization: Date;
  sunExposure: number;
  fertilizationWeek: number;
  userId: string;
  speciesId: string;
  categoriesPlantIds: string[];
}

export interface PlantOutput{
  id: string;
  plantName: string;
  plantDescription: string;
  plantingDate: Date;
  estimatedHarvestDate: Date;
  plantStatus: string;
  currentHeight: number;
  currentWidth: number;
  irrigationWeek: number;
  healthStatus: string;
  lastIrrigation: Date;
  lastFertilization: Date;
  sunExposure: number;
  fertilizationWeek: number;
  userId: string;
  speciesId: string;
  createdAt: Date;
  updatedAt: Date;
  categoriesPlant: CategoryPlant[];
}

export interface CategoryPlant{
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryPlantInput{
  name: string;
  description: string;
  userId: string;
}

export interface Garden{
  id: string;
  userId: string;
  gardenName: string;
  gardenDescription: string;
  gardenLocation: string;
  totalArea: number;
  healthStatus: string;
  currentingHeight: number;
  currentingWidth: number;
  plantingDate: Date;
  lastIrrigation: Date;
  lastFertilization: Date;
  irrigationWeek: number;
  sunExposure: number;
  fertilizationWeek: number;
  createdAt: Date;
  updatedAt: Date;
  plantsId: string[];
}

export interface GardenInput{
  gardenName: string;
  gardenDescription: string;
  gardenLocation: string;
  totalArea: number;
  currentingHeight: number;
  currentingWidth: number;
  healthStatus: string;
  userId : string;
  plantingDate: Date;
  lastIrrigation: Date;
  lastFertilization: Date;
  irrigationWeek: number;
  sunExposure: number;
  fertilizationWeek: number;
  categoriesPlantId: string[];
  plantsId: string[];
}

export interface GardenOutput{
  id: string;
  userId: string;
  gardenName: string;
  gardenDescription: string;
  gardenLocation: string;
  totalArea: number;
  currentingHeight: number;
  currentingWidth: number;
  plantingDate: Date;
  lastIrrigation: Date;
  lastFertilization: Date;
  irrigationWeek: number;
  sunExposure: number;
  fertilizationWeek: number;
  healthStatus: string;
  createdAt: Date;
  updatedAt: Date;
  categoriesPlant: CategoryPlant[];
  plants: PlantOutput[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
  taskDate: Date;
  urgencyLevel: number;
  taskStatus: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  categoriesId: string[];
  gardensId: string[];
  plantsId: string[];
}

export interface TaskInput{
  name: string;
  description: string;
  taskDate: Date;
  urgencyLevel: number;
  taskStatus: string;
  userId: string;
  categoriesId: string[];
  gardensId: string[];
  plantsId: string[];
}

export interface TaskOutput{
  id: string;
  name: string;
  description: string;
  taskDate: Date;
  urgencyLevel: number;
  taskStatus: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  categories: CategoryTask[];
  gardens: GardenOutput[];
  plants: PlantOutput[];
}

export interface CategoryTask {
  id: string;
  name: string;
  userId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryTaskInput{
  name: string;
  description: string;
  userId: string;
}

export interface HistoryGarden {
  id: string;
  gardenId: string;
  gardenLocation: string;
  totalArea: number;
  recordDate: Date;
  height: number;
  width: number;
  healthStatus: string;
  irrigation: boolean;
  fertilization: boolean;
  irrigationWeek: number;
  sunExposure: number;
  fertilizationWeek: number;
  notes: string;
  userId: string;
  createdAt: Date;
}

export interface HistoryPlant {
  id: string;
  plantId: string;
  irrigationWeek: number;
  recordDate: Date;
  height: number;
  width: number;
  healthStatus: string;
  irrigation: boolean;
  fertilization: boolean;
  sunExposure: number;
  fertilizationWeek: number;
  notes: string;
  userId: string;
  createdAt: Date;
}


export interface Diagnosis {
  id: string;
  plantImage: string;
  disease: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}