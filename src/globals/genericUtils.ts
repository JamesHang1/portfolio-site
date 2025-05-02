const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) ) + min;

// function useLocalStorage(key: string, fallbackValue: string | string[] | object | object[]) {
//     const [value, setValue] = useState(fallbackValue);

//     useEffect(() => {
//         const stored = localStorage.getItem(key);
//         setValue(stored || fallbackValue);
//     }, [fallbackValue, key]);

//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(value));
//     }, [key, value]);

//     return [value, setValue] as const;
// }

const GenericUtils = {
    getRandomInt
};

export default GenericUtils;