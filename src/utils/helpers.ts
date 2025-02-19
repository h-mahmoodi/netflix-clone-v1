export const truncateText = (text: string = "", limit: number) => {
  return text.length > limit ? `${text.substring(0, limit - 1)}...` : text;
};

export const getRandomArrayItems = (arr = [], number: number) => {
  if (!arr || arr.length === 0) {
    return [];
  }
  const array = [...arr];
  for (let i = 0; i < array.length - 1; i++) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, number);
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const localData = localStorage.getItem(key);
    if (localData === null) {
      return null;
    }
    return JSON.parse(localData) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage data for key "${key}":`, error);
    return null;
  }
};

export const saveToLocalStorage = <
  T extends string | number | Array<string> | Array<number> | object
>(
  key: string,
  value: T
): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(
      `Failed to save to localStorage. Key: "${key}", Value:`,
      value,
      error
    );
  }
};

// export const validation = (field, rules = {}) => {
//   let error = "";
//   const { name, value, type = "string" } = field;
//   const ruleHandlers = {
//     required: (value) => {
//       if (!value || !value.trim()) {
//         return `${name} is required`;
//       }
//       return "";
//     },
//     isEmail: (value) => {
//       if (!/\S+@\S+\.\S+/.test(value)) {
//         return `${name} must be a valid email`;
//       }
//       return "";
//     },
//     min: (value) => {
//       if (type === "number" && value < rules.min) {
//         return `${name} must be at least ${rules.min}`;
//       }
//       if (type === "string" && value.length < rules.min) {
//         return `${name} must be at least ${rules.min} characters`;
//       }
//       return "";
//     },
//     max: (value) => {
//       if (type === "number" && value > rules.min) {
//         return `${name} must be no more than ${rules.max}`;
//       }
//       if (type === "string" && value.length > rules.min) {
//         return `${name} must be no more than ${rules.max} characters`;
//       }
//       return "";
//     },
//     isEqual: (value) => {
//       if (value !== rules.isEqual) {
//         return `${name} must be equal`;
//       }
//       return "";
//     },
//   };

//   for (const rule in rules) {
//     if (rule in ruleHandlers && rules[rule] !== false) {
//       error = ruleHandlers[rule](value);
//       if (error) break; // Stop at the first error encountered
//     }
//   }

//   return error;
// };
