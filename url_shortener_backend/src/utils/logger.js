const log = (message) => {
    console.log(`[LOG]: ${message}`);
};

const error = (message) => {
    console.error(`[ERROR]: ${message}`);
};

const info = (message) => {
    console.info(`[INFO]: ${message}`);
};

const warn = (message) => {
    console.warn(`[WARN]: ${message}`);
};



module.exports = { log, error, info, warn };