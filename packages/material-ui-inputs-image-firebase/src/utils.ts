import firebase from "@trejgun/firebase";

export const deleteUrl = async (imageUrl: string): Promise<void> => {
  const storageRef = firebase.storage().ref();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await storageRef
    .child(imageUrl)
    .delete()
    .catch(e => {
      console.error("Can't delete file:", e);
      if (e.code !== "storage/object-not-found") {
        throw e;
      }
    });
};
