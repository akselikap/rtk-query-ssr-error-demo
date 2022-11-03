// This is basically dependency injection
import { overrideExports } from './client/api';
import { api } from './ssrApi';
overrideExports(api);

import express, { Request, Response } from "express";
import { createStore } from "./client/store";
import { renderReactAppToString } from './serverRender';
import { REACT_APP_MOUNT_ID } from './constants';

// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use("/*", ssr);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});

async function ssr(req: Request, res: Response) {
    console.log('Received request');
    const store = createStore(api);
    renderReactAppToString(store);
    await Promise.all(api.util.getRunningOperationPromises());
    const app = renderReactAppToString(store);
    console.log('Rendered final version');
    res.type('html');
    res.status(200);
    // Usually we would add the bundle script and other files to the HTML but for this demo it isn't necessary
    // Also we are not embedding the state to the HTML but the error occurs before that so it shouldn't be necessary
    res.write(`
    <html>
        <body>
            <div id="${REACT_APP_MOUNT_ID}">
                ${app}
            </div>
        </body>
    </html>
    `);
    res.end();
    console.log('Response sent');
}
