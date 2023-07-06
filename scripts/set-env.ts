const { existsSync, mkdirSync, writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const getTargetPathFromEnv = (env: string) => {
    const targets: any = {
        local: `./src/environments/environment.ts`,
        dev: `./src/environments/environment.dev.ts`,
        uat: `./src/environments/environment.uat.ts`,
        prod: `./src/environments/environment.prod.ts`,
    }
    return targets[env];
}

const environment = argv.environment;
const targetPath = getTargetPathFromEnv(environment);
const envDirectory = `./src/environments`;

if (!existsSync(envDirectory)) {
    mkdirSync(envDirectory);
    console.log('Created environments folder');
}

const environmentFileContent = `
export const environment = {
   production: ${environment === 'prod'},
   APP_NAME: "${process.env.APP_NAME}",
   API_URL: "${process.env.API_URL}",
   LOCAL_STORAGE_KEY: "${process.env.LOCAL_STORAGE_KEY}",
   SESSION_TIMEOUT: ${process.env.SESSION_TIMEOUT},
   SESSION_TIMEOUT_COUNTDOWN: ${process.env.SESSION_TIMEOUT_COUNTDOWN}
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
        throw console.error(err);
    }
    console.log(`Wrote env variables to ${targetPath}`);
});
