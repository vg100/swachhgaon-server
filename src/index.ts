import {Server} from './server';

let server = new Server().app;
let port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});