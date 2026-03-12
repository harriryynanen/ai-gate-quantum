
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // WARNING: Add to .gitignore
const solvers = require("../solvers.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedSolvers() {
  const solversCollection = db.collection("solvers");

  for (const solver of solvers) {
    try {
      await solversCollection.doc(solver.id).set(solver);
      console.log(`Successfully seeded solver: ${solver.name}`);
    } catch (error) {
      console.error(`Error seeding solver: ${solver.name}`, error);
    }
  }
}

seedSolvers().then(() => {
    console.log("Seeding complete.");
    process.exit(0);
});
