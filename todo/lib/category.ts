import prisma from "./prisma";

interface Category {
    id: number;
    title: string;
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany()
        return { categories }
    } catch (error) {
        return { error }
    }
}

interface Category {
    id: number;
    title: string;
}

export async function createCategory(title: string): Promise<Category> {
    try {
        const category = await prisma.category.create({
            data: {
                name: title,
            },
        });
        return { id: category.id, title: category.name };
    } catch (error) {
        throw new Error("Failed to create category");
    }
}