// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBA58gTlbqIQqZh4JcVjFxOx-aoeHXDGHU",
    authDomain: "fask-b351f.firebaseapp.com",
    projectId: "fask-b351f",
    storageBucket: "fask-b351f.firebasestorage.app",
    messagingSenderId: "821656855348",
    appId: "1:821656855348:web:85e9a49d30f13c808b7b61",
    measurementId: "G-SDKRMLR880"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadToFirebase = async (file, name) => {
    if (!file) return null;

    const fileRef = ref(storage, `file/${name}`);

    try {
        await uploadBytes(fileRef, file);
        const imgURL = await getDownloadURL(fileRef);
        console.log(name);
        alert("Upload successful!");

        return imgURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};