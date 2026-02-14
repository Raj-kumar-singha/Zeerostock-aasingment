export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    supplier: string;
}

export const inventory: Product[] = [
    { id: 1, name: "Solar Panel 400W", category: "Energy", price: 120, supplier: "EcoEnergy Ltd" },
    { id: 2, name: "Industrial Battery 100Ah", category: "Storage", price: 350, supplier: "PowerStore" },
    { id: 3, name: "LED Warehouse Light", category: "Lighting", price: 45, supplier: "BrightWorks" },
    { id: 4, name: "Copper Wire 100m", category: "Materials", price: 85, supplier: "MetalsInc" },
    { id: 5, name: "Steel Beams 10ft", category: "Materials", price: 200, supplier: "MetalsInc" },
    { id: 6, name: "Automatic Voltage Regulator", category: "Electrical", price: 150, supplier: "SafePower" },
    { id: 7, name: "Concrete Mixer Pack", category: "Construction", price: 500, supplier: "BuildCo" },
    { id: 8, name: "Safety Helmet Pro", category: "Safety", price: 25, supplier: "SafePower" },
    { id: 9, name: "Inverter 5kW", category: "Energy", price: 800, supplier: "EcoEnergy Ltd" },
    { id: 10, name: "Worker Vest High-Viz", category: "Safety", price: 15, supplier: "BrightWorks" },
    { id: 11, name: "Drill Hammer 20V", category: "Tools", price: 110, supplier: "BuildCo" },
    { id: 12, name: "PVC Pipe 2 inch", category: "Materials", price: 12, supplier: "MetalsInc" },
];
