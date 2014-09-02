#!/bin/sh
    
pid=`/bin/ps -fu $USER| grep "node" | grep -v "grep" | awk '{print $2}'`

echo
if [ $pid ]; then
    kill -9 "$pid"
    echo -e "\t* service stopped."
    echo -e "\t  bye~"
else
    echo -e "\t* service stopped already."
fi
echo
