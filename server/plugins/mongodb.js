import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
  try {
    const runtime = useRuntimeConfig();
    console.log(runtime);
    console.log(runtime.apiSecret.MONGODB_URI);
    await mongoose.connect(runtime.apiSecret.MONGODB_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong!",
    });
  }
});
