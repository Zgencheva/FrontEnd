export const execute = (callback) => {
    try {
      const res = callback();
      return [res, null];
    } catch (err) {
      console.error(Error(err.message ?? err));
      // You can also log error messages to an error reporting service here
      return [null, err];
    }
  };
   
  export const executeAsync = async (callback) => {
    try {
      const res = await callback();
      return [res, null];
    } catch (err) {
      console.error(Error(err.message ?? err));
      // You can also log error messages to an error reporting service here
      return [null, err];
    }
  };