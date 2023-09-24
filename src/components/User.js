import { db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 


export const saveUser = async (userId, userData) => {
    try {
        await setDoc(doc(db, "users", userId), userData);
  
      return true;
    } catch (error) {
      return { error };
    }
};
  
export const updateUser = async (userId, userData) => {
    try {
        await updateDoc(doc(db, "users", userId), userData);
  
      return true;
    } catch (error) {
        console.log(error)
      return { error };
    }
};

export const saveInvestor = async (userId, userData) => {
  try {
      await setDoc(doc(db, "InvestorList", userId), userData);

    return true;
  } catch (error) {
    return { error };
  }
};

export const updateInvestor = async (userId, userData) => {
  try {
      await updateDoc(doc(db, "InvestorList", userId), userData);

    return true;
  } catch (error) {
      console.log(error)
    return { error };
  }
};

export const saveTalent = async (userId, userData) => {
  try {
      await setDoc(doc(db, "TalentList", userId), userData);

    return true;
  } catch (error) {
    return { error };
  }
};

export const updateTalent = async (userId, userData) => {
  try {
      await updateDoc(doc(db, "TalentList", userId), userData);

    return true;
  } catch (error) {
      console.log(error)
    return { error };
  }
};