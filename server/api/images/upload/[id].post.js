import ProductModel from "~/server/models/Product.model";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id");
  const pathForImages = `/images/${productId}`;
  const savePathForImages = `./public/${pathForImages}`;
  const storage = createStorage({
    driver: fsLiteDriver({ base: savePathForImages }),
  });

  const body = await readMultipartFormData(event);
  const imagesPaths = [];
  let thumbnailPath = "";
  let i = 1;

  for (const image of body) {
    let ext = image.filename.slice(
      ((image.filename.lastIndexOf(".") - 1) >>> 0) + 2
    );
    let fileName = `${i}.${ext}`;

    if (image.name === "thumbnail") {
      fileName = `thumbnail.${ext}`;
      thumbnailPath = `${pathForImages}/${fileName}`;
    } else {
      i++;
    }

    imagesPaths.push(`${pathForImages}/${fileName}`);
    await storage.setItemRaw(`${fileName}`, image.data);
  }

  const setImages = await $fetch(`/api/products/edit/${productId}`, {
    method: "PATCH",
    body: {
      thumbnail: thumbnailPath,
      images: imagesPaths,
    },
  });

  console.log(setImages);
});
