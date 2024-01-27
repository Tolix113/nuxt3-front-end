import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
  try {
    const runtime = useRuntimeConfig();
    console.debug(runtime);
    await mongoose.connect(runtime.apiSecret.MONGODB_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong!",
    });
  }
});
