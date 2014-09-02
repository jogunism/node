#!/bin/sh

pid=`/bin/ps -fu $USER| grep "node" | grep -v "grep" | awk '{print $2}'`

echo
if [ $pid ]; then
    kill -9 "$pid"
    echo -e "\t* service restart."
else
    echo -e "\t* service start."
fi
echo

nohup nodejs server.js 1>/dev/null 2>&1 & 
