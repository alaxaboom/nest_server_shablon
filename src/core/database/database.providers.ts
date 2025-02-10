import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';

export const databaseProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        let config;
        switch (process.env.PROJECT_STATUS) {
        case "development":
           config = databaseConfig.development;
           break;
        case "test":
           config = databaseConfig.test;
           break;
        case "productiont":
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User]);
        await sequelize.sync();
        return sequelize;
    },
}];