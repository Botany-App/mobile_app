import { v4 as uuidv4 } from 'uuid';
import { 
  Task, 
  TaskInput,
  TaskOutput,
  CategoryPlant, 
  CategoryTask, 
  Garden, 
  Plant, 
  PlantInput,
  PlantOutput,
  HistoryGarden, 
  HistoryPlant, 
  Specie, 
  User,
  GardenOutput,
  GardenInput,
  Diagnosis, 
} from './types';

let tasks: TaskOutput[] = [];
export const taskService = {
    create: async (task: TaskInput): Promise<string> => {
      if (!task.userId) {
        throw new Error('invalid user id');
      }

      const newTask: TaskOutput = {
        ...task,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: [],
        gardens: [],   
        plants: [],     
      };
      if (task.categoriesId?.length) {
        newTask.categories = categoriesPlant.filter((category) => task.categoriesId.includes(category.id));
      }
  
      if (task.gardensId?.length) {
        newTask.gardens = gardens.filter((garden) => task.gardensId.includes(garden.id));
      }
  
      if (task.plantsId?.length) {
        newTask.plants = plants.filter((plant) => task.plantsId.includes(plant.id));
      }
  
      tasks.push(newTask);
      return newTask.id;
    },
  

    update: async (updatedTask: TaskInput & { id: string }): Promise<void> => {
      const taskIndex = tasks.findIndex((t) => t.id === updatedTask.id);
      if (taskIndex === -1) throw new Error("Task não encontrada");
  
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updatedTask,
        updatedAt: new Date(),
        categories: [],
        gardens: [],
        plants: [],
      };
  
      if (updatedTask.categoriesId?.length) {
        tasks[taskIndex].categories = categoriesPlant.filter((category) =>
          updatedTask.categoriesId.includes(category.id)
        );
      }
  
      if (updatedTask.gardensId?.length) {
        tasks[taskIndex].gardens = gardens.filter((garden) =>
          updatedTask.gardensId.includes(garden.id)
        );
      }
  
      if (updatedTask.plantsId?.length) {
        tasks[taskIndex].plants = plants.filter((plant) =>
          updatedTask.plantsId.includes(plant.id)
        );
      }
    },

  delete: async (userId: string, id: string): Promise<void> => {
    const index = tasks.findIndex((t) => t.id === id && t.userId === userId);
    if (index !== -1) tasks.splice(index, 1);
  },

  findByID: async (userId: string, id: string): Promise<TaskOutput | null> => {
    return tasks.find((t) => t.id === id && t.userId === userId) || null;
  },

  findByCategoryName: async (userId: string, categoryName: string): Promise<TaskOutput[]> => {
    return tasks.filter(
      (t) => t.userId === userId && t.categories.some((c) => c.name === categoryName)
    );
  },

  findByName: async (userId: string, name: string): Promise<TaskOutput[]> => {
    return tasks.filter((t) => t.userId === userId && t.name.includes(name));
  },

  findAll: async (userId: string): Promise<TaskOutput[]> => {
    return tasks.filter((t) => t.userId === userId);
  },

  findByStatus: async (userId: string, status: string): Promise<TaskOutput[]> => {
    return tasks.filter((t) => t.userId === userId && t.taskStatus === status);
  },

  findByUrgencyLevel: async (userId: string, urgencyLevel: number): Promise<TaskOutput[]> => {
    return tasks.filter((t) => t.userId === userId && t.urgencyLevel === urgencyLevel);
  },
};

// CategoryTask Functions
let categoryTasks: CategoryTask[] = [];
export const categoryTaskService = {
  create: async (categoryTask: Omit<CategoryTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const newCategoryTask: CategoryTask = {
      ...categoryTask,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categoryTasks.push(newCategoryTask);
    return newCategoryTask.id;
  },

  findById: async (userId: string, id: string): Promise<CategoryTask | null> => {
    return categoryTasks.find((category) => category.id === id && category.userId === userId) || null;
  },

  findByName: async (userId: string, name: string): Promise<CategoryTask[]> => {
    return categoryTasks.filter(
      (category) => category.name.toLowerCase().includes(name.toLowerCase()) && category.userId === userId
    );
  },

  findAll: async (userId: string): Promise<CategoryTask[]> => {
    return categoryTasks.filter((category) => category.userId === userId);
  },

  update: async (updatedCategoryTask: CategoryTask): Promise<void> => {
    const index = categoryTasks.findIndex(
      (category) => category.id === updatedCategoryTask.id && category.userId === updatedCategoryTask.userId
    );
    if (index === -1) throw new Error('CategoryTask não encontrada');

    categoryTasks[index] = {
      ...updatedCategoryTask,
      updatedAt: new Date(),
    };
  },

  delete: async (userId: string, id: string): Promise<void> => {
    const index = categoryTasks.findIndex((category) => category.id === id && category.userId === userId);
    if (index === -1) throw new Error('CategoryTask não encontrada');

    categoryTasks.splice(index, 1);
  },
};

// Plant Functions
let plants: PlantOutput[] = [];
let historyPlants: HistoryPlant[] = [];
export const plantService = {
  create: async (plantInput: PlantInput): Promise<string> => {
    const newPlant: PlantOutput = {
      ...plantInput,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categoriesPlant: categoriesPlant.filter((cat) =>
        plantInput.categoriesPlantIds.includes(cat.id)
      ),
    };
    plants.push(newPlant);
    return newPlant.id;
  },

  findByID: async (userId: string, id: string): Promise<PlantOutput | null> => {
    return plants.find((p) => p.id === id && p.userId === userId) || null;
  },

  findBySpeciesName: async (userId: string, speciesId: string): Promise<PlantOutput[]> => {
    return plants.filter((p) => p.speciesId === speciesId && p.userId === userId);
  },

  findByCategoryName: async (userId: string, categoryName: string): Promise<PlantOutput[]> => {
    return plants.filter(
      (p) =>
        p.userId === userId &&
        p.categoriesPlant.some((category) =>
          category.name.toLowerCase().includes(categoryName.toLowerCase())
        )
    );
  },

  findByName: async (userId: string, name: string): Promise<PlantOutput[]> => {
    return plants.filter(
      (p) => p.userId === userId && p.plantName.toLowerCase().includes(name.toLowerCase())
    );
  },

  findAll: async (userId: string): Promise<PlantOutput[]> => {
    return plants.filter((p) => p.userId === userId);
  },

  update: async (updatedPlant: PlantOutput): Promise<void> => {
    const index = plants.findIndex((p) => p.id === updatedPlant.id && p.userId === updatedPlant.userId);
    if (index === -1) throw new Error('Planta não encontrada');
    const history: HistoryPlant = {
      id: uuidv4(),
      plantId: updatedPlant.id,
      irrigationWeek: updatedPlant.irrigationWeek,
      recordDate: new Date(),
      height: updatedPlant.currentHeight,
      width: updatedPlant.currentWidth,
      healthStatus: updatedPlant.healthStatus,
      irrigation: updatedPlant.irrigationWeek > 0,
      fertilization: updatedPlant.fertilizationWeek > 0,
      sunExposure: updatedPlant.sunExposure,
      fertilizationWeek: updatedPlant.fertilizationWeek,
      notes: 'Atualização automática do histórico.',
      userId: updatedPlant.userId,
      createdAt: new Date(),
    };
    historyPlants.push(history);

    // Atualizar planta
    plants[index] = {
      ...updatedPlant,
      updatedAt: new Date(),
    };
  },

  delete: async (userId: string, id: string): Promise<void> => {
    const index = plants.findIndex((p) => p.id === id && p.userId === userId);
    if (index === -1) throw new Error('Planta não encontrada');
    plants.splice(index, 1);
  },

  createHistory: async (history: HistoryPlant): Promise<void> => {
    historyPlants.push({
      ...history,
      id: uuidv4(),
      createdAt: new Date(),
    });
  },

  findAllHistoryByPlantID: async (plantID: string): Promise<HistoryPlant[]> => {
    return historyPlants.filter((h) => h.plantId === plantID);
  },
};

// CategoryPlant Functions

let categoriesPlant: CategoryPlant[] = []
export const categoryPlantService = {
  create: async (
    categoryPlantInput: Omit<CategoryPlant, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> => {
    const newCategoryPlant: CategoryPlant = {
      ...categoryPlantInput,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categoriesPlant.push(newCategoryPlant);
    return newCategoryPlant.id;
  },

  findById: async (userId: string, id: string): Promise<CategoryPlant | null> => {
    return categoriesPlant.find(
      (category) => category.id === id && category.userId === userId
    ) || null;
  },

  findAll: async (userId: string): Promise<CategoryPlant[]> => {
    return  categoriesPlant.filter((category) => category.userId === userId);
  },

  findByName: async (userId: string, name: string): Promise<CategoryPlant[]> => {
    return  categoriesPlant.filter(
      (category) =>
        category.userId === userId &&
        category.name.toLowerCase().includes(name.toLowerCase())
    );
  },

  update: async (updatedCategoryPlant: CategoryPlant): Promise<void> => {
    const index =  categoriesPlant.findIndex(
      (category) =>
        category.id === updatedCategoryPlant.id &&
        category.userId === updatedCategoryPlant.userId
    );

    if (index === -1) throw new Error('Categoria não encontrada');

    categoriesPlant[index] = {
      ...updatedCategoryPlant,
      updatedAt: new Date(),
    };
  },

  delete: async (userId: string, id: string): Promise<void> => {
    const index = categoriesPlant.findIndex(
      (category) => category.id === id && category.userId === userId
    );

    if (index === -1) throw new Error('Categoria não encontrada');

    categoriesPlant.splice(index, 1);
  },
};

// Garden Functions
let gardens: GardenOutput[] = [];
let historyGardens: HistoryGarden[] = [];
export const gardenService = {
  create: async (gardenInput: GardenInput & { userId: string }): Promise<string> => {
    const newGarden: GardenOutput = {
      ...gardenInput,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categoriesPlant: categoriesPlant.filter((cat) =>
        gardenInput.categoriesPlantId.includes(cat.id)
      ),
      plants: plants.filter((plant) => gardenInput.plantsId.includes(plant.id)),
    };
    gardens.push(newGarden);
    return newGarden.id;
  },

  findByID: async (userId: string, id: string): Promise<GardenOutput | null> => {
    return gardens.find((garden) => garden.id === id && garden.userId === userId) || null;
  },

  findByName: async (userId: string, name: string): Promise<GardenOutput[]> => {
    return gardens.filter(
      (garden) =>
        garden.userId === userId &&
        garden.gardenName.toLowerCase().includes(name.toLowerCase())
    );
  },

  findByLocation: async (userId: string, location: string): Promise<GardenOutput[]> => {
    return gardens.filter(
      (garden) =>
        garden.userId === userId &&
        garden.gardenLocation.toLowerCase().includes(location.toLowerCase())
    );
  },

  findByCategoryName: async (userId: string, categoryName: string): Promise<GardenOutput[]> => {
    return gardens.filter(
      (garden) =>
        garden.userId === userId &&
        garden.categoriesPlant.some((category) =>
          category.name.toLowerCase().includes(categoryName.toLowerCase())
        )
    );
  },

  findAll: async (userId: string): Promise<GardenOutput[]> => {
    return gardens.filter((garden) => garden.userId === userId);
  },


  update: async (
    id: string,
    userId: string,
    gardenInput: GardenInput
  ): Promise<void> => {
    const index = gardens.findIndex(
      (garden) => garden.id === id && garden.userId === userId
    );
    if (index === -1) throw new Error('Garden não encontrado');

    const existingGarden = gardens[index];

    const history: HistoryGarden = {
      id: uuidv4(),
      gardenId: existingGarden.id,
      gardenLocation: existingGarden.gardenLocation,
      totalArea: existingGarden.totalArea,
      recordDate: new Date(),
      height: existingGarden.currentingHeight,
      width: existingGarden.currentingWidth,
      healthStatus: existingGarden.healthStatus,
      irrigation: existingGarden.irrigationWeek > 0,
      fertilization: existingGarden.fertilizationWeek > 0,
      irrigationWeek: existingGarden.irrigationWeek,
      sunExposure: existingGarden.sunExposure,
      fertilizationWeek: existingGarden.fertilizationWeek,
      notes: 'Atualização do Garden',
      userId: existingGarden.userId,
      createdAt: new Date(),
    };
    historyGardens.push(history);

    gardens[index] = {
      ...existingGarden, 
      ...gardenInput,
      updatedAt: new Date(),
      categoriesPlant: categoriesPlant.filter((cat) =>
        gardenInput.categoriesPlantId.includes(cat.id)
      ),
      plants: plants.filter((plant) =>
        gardenInput.plantsId.includes(plant.id)
      ),
    };
  },

  delete: async (userId: string, id: string): Promise<void> => {
    const index = gardens.findIndex(
      (garden) => garden.id === id && garden.userId === userId
    );
    if (index === -1) throw new Error('Garden não encontrado');

    gardens.splice(index, 1);
  },

  createHistory: async (history: HistoryGarden): Promise<void> => {
    historyGardens.push({
      ...history,
      id: uuidv4(),
      createdAt: new Date(),
    });
  },

  findAllHistoryByGardenID: async (gardenID: string): Promise<HistoryGarden[]> => {
    return historyGardens.filter((history) => history.gardenId === gardenID);
  },
};

// Specie Functions

const species: Specie[] = [
  {
    id: '1',
    commonName: 'Milho',
    specieDescription: 'Planta anual cultivada para grãos e forragem.',
    scientificName: 'Zea mays',
    botanicalFamily: 'Poaceae',
    growthType: 'Herbácea',
    idealTemperature: 21.0,
    idealClimate: 'Tropical e subtropical',
    lifeCycle: 'Anual',
    plantingSeason: 'Primavera/Verão',
    harvestTime: 120,
    averageHeight: 2.5,
    averageWidth: 0.25,
    irrigationWeight: 0.75,
    fertilizationWeight: 0.6,
    sunWeight: 0.85,
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Maize_ear_closeup.jpg/800px-Maize_ear_closeup.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    commonName: 'Laranja',
    specieDescription: 'Árvore perene cultivada para frutos cítricos.',
    scientificName: 'Citrus sinensis',
    botanicalFamily: 'Rutaceae',
    growthType: 'Árvores frutíferas',
    idealTemperature: 24.0,
    idealClimate: 'Tropical e subtropical',
    lifeCycle: 'Perene',
    plantingSeason: 'Outono/Inverno',
    harvestTime: 365,
    averageHeight: 4.5,
    averageWidth: 2.5,
    irrigationWeight: 0.7,
    fertilizationWeight: 0.65,
    sunWeight: 0.9,
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Orange-Fruit-Pieces.jpg/800px-Orange-Fruit-Pieces.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const specieService = {
  findAll: async (): Promise<Specie[]> => {
    return species;
  },

  findById: async (id: string): Promise<Specie | null> => {
    const specie = species.find((s) => s.id === id);
    return specie || null;
  },

  // Buscar espécie pelo nome comum
  findByName: async (commonName: string): Promise<Specie[]> => {
    return species.filter((s) =>
      s.commonName.toLowerCase().includes(commonName.toLowerCase())
    );
  },
};

// User Functions
let users: User[] = []
export const userService = {
  getAllUsers(): User[] {
    return users;
  },

  getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  },

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...user,
    };
    users.push(newUser);
    return newUser;
  },

  updateUser(
    id: string,
    updatedUser: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): boolean {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, updatedUser);
      user.updatedAt = new Date();
      return true;
    }
    return false;
  },

  // Deleta um usuário
  deleteUser(id: string): boolean {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  },
};


let diagnoses: Diagnosis[] = [];

export const createDiagnosis = (diagnosis: Omit<Diagnosis, 'id' | 'createdAt' | 'updatedAt'>): Diagnosis => {
  const newDiagnosis: Diagnosis = {
    id: `diagnosis_${diagnoses.length + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...diagnosis,
  };
  diagnoses.push(newDiagnosis);
  return newDiagnosis;
};

export const searchData = (query: string) => {
  const lowerQuery = query.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(lowerQuery)
  );

  const filteredGardens = gardens.filter(garden =>
    garden.gardenName.toLowerCase().includes(lowerQuery) ||
    garden.gardenDescription.toLowerCase().includes(lowerQuery)
  );

  const filteredPlants = plants.filter(plant =>
    plant.plantName.toLowerCase().includes(lowerQuery) ||
    plant.plantDescription.toLowerCase().includes(lowerQuery)
  );

  return {
    tasks: filteredTasks,
    gardens: filteredGardens,
    plants: filteredPlants,
  };
};


export const getRecentlyAccessed = () => {
  const recentGardens = gardens.slice(-5).reverse(); 
  const recentPlants = plants.slice(-5).reverse();   
  return {
    gardens: recentGardens,
    plants: recentPlants,
  };
};

export const getTasksByUrgency = (): TaskOutput[] => {
  return [...tasks].sort((a, b) => b.urgencyLevel - a.urgencyLevel).slice(0, 5);
};

