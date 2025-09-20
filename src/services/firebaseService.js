import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { sendWelcomeEmail } from './emailService';

// User Authentication Functions
export const registerUser = async (email, password, userData) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, {
      displayName: userData.displayName || userData.name
    });

    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      userId: user.uid,
      email: email,
      phoneNumber: userData.phoneNumber || '',
      displayName: userData.displayName || userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      portfolioData: {
        about: userData.portfolioData?.about || {},
        contact: userData.portfolioData?.contact || {},
        experience: userData.portfolioData?.experience || {},
        header: userData.portfolioData?.header || {},
        hero: userData.portfolioData?.hero || {},
        projects: userData.portfolioData?.projects || {},
        skills: userData.portfolioData?.skills || {}
      }
    });

    // Send welcome email
    try {
      const emailResult = await sendWelcomeEmail({
        userId: user.uid,
        email: email,
        displayName: userData.displayName || userData.name,
        name: userData.name
      });
      
      if (emailResult.success) {
        console.log('Welcome email sent successfully');
      } else {
        console.warn('Failed to send welcome email:', emailResult.error);
      }
    } catch (emailError) {
      console.warn('Error sending welcome email:', emailError);
      // Don't fail the registration if email fails
    }

    return { success: true, user: user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Portfolio Data Functions
export const savePortfolioData = async (userId, portfolioData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      portfolioData: portfolioData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Save portfolio data error:', error);
    return { success: false, error: error.message };
  }
};

export const getPortfolioData = async (userId) => {
  try {
    console.log('Getting portfolio data for userId:', userId);
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    console.log('Document exists:', userSnap.exists());
    if (userSnap.exists()) {
      const data = userSnap.data();
      console.log('User data retrieved:', data);
      return { 
        success: true, 
        data: data
      };
    } else {
      console.log('User document does not exist');
      return { 
        success: false, 
        error: 'User data not found' 
      };
    }
  } catch (error) {
    console.error('Get portfolio data error:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, error: error.message };
  }
};

export const updatePortfolioSection = async (userId, sectionName, sectionData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentData = userSnap.data();
      const updatedPortfolioData = {
        ...currentData.portfolioData,
        [sectionName]: sectionData
      };
      
      await updateDoc(userRef, {
        portfolioData: updatedPortfolioData,
        updatedAt: new Date()
      });
      
      return { success: true };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Update portfolio section error:', error);
    return { success: false, error: error.message };
  }
};

// Get all users (for admin purposes)
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: users };
  } catch (error) {
    console.error('Get all users error:', error);
    return { success: false, error: error.message };
  }
};

// Get public portfolio data by userId (for public viewing)
export const getPublicPortfolioData = async (userId) => {
  try {
    console.log('Getting public portfolio data for userId:', userId);
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    console.log('Document exists:', userSnap.exists());
    if (userSnap.exists()) {
      const data = userSnap.data();
      console.log('Public user data retrieved:', data);
      
      // Return only public data (exclude sensitive information)
      const publicData = {
        userId: data.userId,
        displayName: data.displayName,
        portfolioData: data.portfolioData,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      
      return { 
        success: true, 
        data: publicData
      };
    } else {
      console.log('User document does not exist');
      return { 
        success: false, 
        error: 'Portfolio not found' 
      };
    }
  } catch (error) {
    console.error('Get public portfolio data error:', error);
    return { success: false, error: error.message };
  }
};

// File Upload Functions
export const uploadFile = async (userId, file, fileType) => {
  try {
    // Create file reference with user-specific path
    const fileExtension = file.name.split('.').pop();
    const fileName = `${fileType}_${Date.now()}.${fileExtension}`;
    const fileRef = ref(storage, `users/${userId}/${fileType}/${fileName}`);
    
    // Upload file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { 
      success: true, 
      downloadURL, 
      fileName,
      filePath: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error: error.message };
  }
};

export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error('File deletion error:', error);
    return { success: false, error: error.message };
  }
};

export const updatePortfolioFiles = async (userId, fileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentData = userSnap.data();
      const updatedPortfolioData = {
        ...currentData.portfolioData,
        hero: {
          ...currentData.portfolioData.hero,
          files: {
            ...currentData.portfolioData.hero.files,
            ...fileData
          }
        }
      };
      
      await updateDoc(userRef, {
        portfolioData: updatedPortfolioData,
        updatedAt: new Date()
      });
      
      return { success: true };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Update portfolio files error:', error);
    return { success: false, error: error.message };
  }
};
