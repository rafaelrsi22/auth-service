declare global : {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DB_PORT: number;
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            AUTH_SECRET: string;
            AUTH_COOKIE_NAME: string;
        }
    }
}