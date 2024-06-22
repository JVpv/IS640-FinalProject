#!/bin/bash

npm install
npm uninstall bcrypt
npm install bcrypt
npm run migrate
npm run dev