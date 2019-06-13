#!/bin/sh

npm install && npm run build

if [ ! -e "./config.ini" ]
then
    cp config.ini.default config.ini
fi