import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseconfig"
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

// Custom hook to handle fetching and updating networth data
export const useFirebaseFirestore = () => {
    const [networth, setNetworth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;
        const docRef = doc(db, "users", user.uid);

        // Real-time listener for networth updates
        const unsubscribe = onSnapshot(
            docRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setNetworth(snapshot.data().networth || []);
                } else {
                    setNetworth([]);
                }
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Function to add a new networth item
    const addItemToFirestore = async (key, newItem) => {
        if (!user) return console.error("❌ User not logged in.");
    
        try {
            const docRef = doc(db, "users", user.uid);
            // Check if the document exists before updating
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                console.warn(`⚠️ Document for user ${user.uid} does not exist. Creating it now.`);
                await setDoc(docRef, { [key]: [newItem]}, { merge: true });
            } else {
                // If the document exists, update the array field dynamically
                await updateDoc(docRef, {
                    [key]: arrayUnion(newItem),
                });
            }
    
            console.log(`✅ Successfully added item to ${key}:`, newItem);
        } catch (err) {
            console.error(`❌ Error adding item to ${key}:`, err);
            setError(err.message);
        }
    };
    
    return { networth, addItemToFirestore , loading, error };
};

