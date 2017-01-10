#!/bin/sh
while true
do
    DEBUG=nightmare* xvfb-run --server-args="-screen 0 1024x768x24" npm start
    sleep ${INTERVAL_CHECK_M}m
done
