const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        // Test connection with a query
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log('Database connection successful:', result);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();