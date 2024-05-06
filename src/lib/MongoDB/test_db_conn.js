import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI ?? "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("cowrite").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const documents = await client
      .db("cowrite")
      .collection("documents")
      .find()
      .toArray();
    console.log({ data: documents });
  } catch (err) {
    console.log({ msg: err.message });
  } finally {
    await client.close();
  }
}

run();
