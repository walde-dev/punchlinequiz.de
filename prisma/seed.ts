import { prisma } from "../src/server/db";

async function main() {
  await prisma.artist.deleteMany({});
  await prisma.album.deleteMany({});
  await prisma.song.deleteMany({});
  await prisma.punchline.deleteMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
