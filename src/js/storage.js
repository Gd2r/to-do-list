export const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const loadFromStorage = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Storage parse error:', error);
        return null;
    }
  };