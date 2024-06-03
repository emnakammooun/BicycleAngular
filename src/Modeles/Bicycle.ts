export interface Bicycle {
    id: string; // Unique identifier for the bicycle
    model: string; // Model of the bicycle
    color: string; // Color of the bicycle
    image: string
    isAvailable: boolean;
    typeId: string; //foreignkey    
}