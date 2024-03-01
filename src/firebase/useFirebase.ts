import { initializeApp, FirebaseApp } from 'firebase/app';
import { arrayUnion, doc, getDoc, getFirestore, setDoc, arrayRemove } from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';


const firebaseApp = initializeApp(getFirebaseConfig());
const firestore = getFirestore(firebaseApp);


async function writeFavCity(currentUser: string, currentCity: string) {
    
    const favCity = doc(firestore, 'FavCityCollection', currentUser);
    const favCityDoc = await getDoc(favCity);
    if (favCityDoc.exists()) {
        const currentCityList = favCityDoc.data()?.cityList || [];
        
        if (!currentCityList.includes(currentCity)) {
            const updatedCityList = arrayUnion(currentCity);
            await setDoc(favCity, { cityList: updatedCityList }, { merge: true });
            // alert("Місто успішно додане!");
        } else {
            alert("Місто уже додане!");
            // console.log("City already in the list!");
        }
    } else {
        await setDoc(favCity, { cityList: [currentCity] });
        console.log("Document created with the first city!");
    }
}



async function readFavCity(currentUser: string) {
    const favCity = doc(firestore, 'FavCityCollection', currentUser);
    try {
        const favCityDoc = await getDoc(favCity);

        if (favCityDoc.exists()) {
            const cityList = favCityDoc.data()?.cityList || [];
            return cityList;
        } else {
            console.log("Document does not exist.");
            return [];
        }
    } catch (error) {
        console.error("Error reading document:", error);
        return [];
    }
}



async function deleteFavCity(currentUser: string, cityToDelete: string) {
    const favCity = doc(firestore, 'FavCityCollection', currentUser);

    const favCityDoc = await getDoc(favCity);
    if (favCityDoc.exists()) {
        const currentCityList = favCityDoc.data()?.cityList || [];
        const updatedCityList = arrayRemove(cityToDelete);

        await setDoc(favCity, { cityList: updatedCityList }, { merge: true });

        console.log("City successfully deleted!");
    } else {
        console.log("Document does not exist.");
    }
}




export { writeFavCity, readFavCity, deleteFavCity};