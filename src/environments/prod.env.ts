import {Environment} from './env';

export const ProdEnvironment : Environment= {
    db_url: 'mongodb+srv://vg100:vg100@cluster0.bszog.mongodb.net/?retryWrites=true&w=majority',
    jwt_secret: 'prodSecret'
};
