import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload
} from "@remix-run/react";

import stylesheet from "./tailwind.css?url";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBt9RaT4glOjaVYkSUfYKM3L5g_BxFMtOA",
  authDomain: "vitavault-ddba4.firebaseapp.com",
  databaseURL: "https://vitavault-ddba4-default-rtdb.firebaseio.com",
  projectId: "vitavault-ddba4",
  storageBucket: "vitavault-ddba4.firebasestorage.app",
  messagingSenderId: "251140544413",
  appId: "1:251140544413:web:9e68b0d1c882bacfd2c174",
  measurementId: "G-KXW9L7Z0XR"
}

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

export default function App() {
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <LiveReload />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
