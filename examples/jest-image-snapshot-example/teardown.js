module.exports = async () => {
    global.__SERVER__.close();
    await global.__BROWSER__.close();
};
