import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "coffe.rayen",
  projectId: "66a4e848003170510ea2",
  databaseId: "66a4e8e1002eee4b0823",
  userCollectionId: "66a4e9200033d11299b9",
  coffeCollectionId: "66a4e929002eda7453dd",
  purchaseCollectionId: "66a6fbf0002ea082f45a",
  bookmarkedCollectionId: "66a909b300023f729e8c",
  storageId: "66a4eb080011f0a43177",
};

// Init your React Native SDK
const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export async function getAllCoffes() {
  try {
    const coffes = await databases.listDocuments(
      config.databaseId,
      config.coffeCollectionId
    );
    return coffes.documents;
  } catch (error: any) {
    throw new Error("allcoffe");
  }
}
export async function getCoffe({ itemId }: { itemId: any }) {
  try {
    const coffe = await databases.listDocuments(
      config.databaseId,
      config.coffeCollectionId,
      [Query.equal("$id", itemId)]
    );
    return coffe.documents;
  } catch (error: any) {
    throw new Error("coffe");
  }
}
export async function createUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw new Error!();
    await login({ email, password });
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, username, email }
    );
    const newBookMark = await databases.createDocument(
      config.databaseId,
      config.bookmarkedCollectionId,
      ID.unique(),
      {
        usersss: newUser.$id,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error("create user");
  }
}
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await account.createEmailPasswordSession(email, password);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error("logout");
  }
}
export async function getUser(id: string) {
  try {
    const user = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", id)]
    );

    return user.documents[0];
  } catch (error: any) {
    throw new Error("getuser");
  }
}

export const getCurrentUser = async () => {
  try {
    const currnentAccount = await account.get();

    if (!currnentAccount) throw Error();
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currnentAccount.$id)]
    );
    if (!currentUser) throw Error();
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarked = async (id: string) => {
  try {
    const bookmark = await databases.listDocuments(
      config.databaseId,
      config.bookmarkedCollectionId,
      [Query.equal("usersss", id)]
    );

    return bookmark.documents[0];
  } catch (error) {}
};
export const updateBookMark = async (docId: string, newData: any) => {
  try {
    const bookemark = await databases.updateDocument(
      config.databaseId,
      config.bookmarkedCollectionId,
      docId,
      newData
    );
  } catch (error) {
    console.log(error);
  }
};

export const OrderCart = async (
  id: string,
  cart: string[],
  adress: string,
  price: number,
  feePrice: number,
  username: string
) => {
  try {
    const order = await databases.createDocument(
      config.databaseId,
      config.purchaseCollectionId,
      ID.unique(),
      { users: id, cart, adress, price, feePrice, username }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getAllOrders = async (userId: string) => {
  try {
    const orders = await databases.listDocuments(
      config.databaseId,
      config.purchaseCollectionId,
      [Query.equal("users", userId)]
    );
    return orders.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getOrder = async (id: any) => {
  try {
    const order = await databases.listDocuments(
      config.databaseId,
      config.purchaseCollectionId,
      [Query.equal("$id", id)]
    );
    console.log(order);
    return order.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const coffeSearch = async (name: string) => {
  try {
    const coffes = await databases.listDocuments(
      config.databaseId,
      config.coffeCollectionId,
      [Query.search("name", name)]
    );
    return coffes.documents;
  } catch (error) {
    console.log(error);
  }
};
