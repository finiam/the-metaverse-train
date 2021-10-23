export const asyncLoad = (loader, name) => {
  return new Promise((resolve, reject) => {
    loader.load(
      name,
      (object) => {
        resolve(object);
      },
      (loadingInfo) => {
        console.log(
          `Loading ${name}: ${(loadingInfo.loaded / loadingInfo.total) * 100} %`
        );
      },
      (error) => {
        console.log(`Error loading ${name}:`, error);
        reject(error);
      }
    );
  });
};