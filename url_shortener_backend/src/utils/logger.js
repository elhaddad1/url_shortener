const log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[LOG] [${timestamp}]: ${message}`);
};

const error = (message) => {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] [${timestamp}]: ${message}`);
};

const info = (message) => {
    const timestamp = new Date().toISOString();
    console.info(`[INFO] [${timestamp}]: ${message}`);
};

const warn = (message) => {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] [${timestamp}]: ${message}`);
};

module.exports = { log, error, info, warn };
