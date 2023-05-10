# the script is to profiling a node process
# to use, you have to generate profiling log via adding params when starting your application:
# node `--prof` app.js

filename='isolate-0xnnnnnnnnnnnn-v8.log'
node --prof-process $filename > processed.txt