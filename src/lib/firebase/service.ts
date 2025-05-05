import bcrypt from "bcryptjs";
import app from "./init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

type User = {
  id: string;
  email: string;
  fullname: string;
  password: string;
  role?: string;
};

type Data = {
  fullname: string;
  email: string;
  type: string;
  role?: string;
};

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
}) {
  if (!data.email)
    return { status: false, message: "Empty Field", statusCode: 400 };
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return { status: false, message: "Email already exists", statusCode: 400 };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, message: "Register Success", statusCode: 201 };
    } catch (error) {
      if (error instanceof Error)
        return { status: false, message: "Register Failed", statusCode: 400 };
    }
  }
}

export async function login(data: { email: string; password: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<User, "id">),
  }));

  if (users.length > 0) {
    const user: User = users[0];
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (checkPassword) {
      const userData = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      };
      return {
        status: true,
        message: "Login Success",
        statusCode: 200,
        data: userData,
      };
    }
  } else {
    return {
      status: false,
      message: "Invalid Credentials",
      statusCode: 400,
    };
  }
}

export async function loginWithGoogle(
  data: Data,
  callback: (res: { status: boolean; data: object }) => void
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<User, "id">),
  }));

  if (users.length > 0) {
    const user = users[0];
    data.role = user.role;
    await updateDoc(doc(firestore, "users", user.id), data);
    callback({ status: true, data });
  } else {
    data.role = "member";
    await addDoc(collection(firestore, "users"), data);
    callback({ status: true, data });
  }
}
