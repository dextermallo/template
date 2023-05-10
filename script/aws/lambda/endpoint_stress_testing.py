"""
this is a script file to do lambda endpoint stress testing,
make sure you've installed relative packages.

usage: enter two parameters to use the scripts:
1. LOADING_TEST_SIZE: how many requests are sent for the loading test.
2. LAMBDA_URI: endpoint of lambda.
"""

import requests
import time
import asyncio
import logging

# logging setup
FORMAT = '%(asctime)s %(levelname)s: %(message)s'
logging.basicConfig(level=logging.DEBUG, filename='.log', filemode='w', format=FORMAT)


LOADING_TEST_SIZE = 500
LAMBDA_URI = None

loop = asyncio.get_event_loop()
start_time = time.time()


async def send_req(idx):
    t = time.time()
    logging.debug(idx, " send at ", t - start_time, ".")

    resp = await loop.run_in_executor(None, requests.get, LAMBDA_URI)
    logging.debug(resp.json())
    t = time.time()
    logging.debug(idx, "receive at", t - start_time, ".")

tasks = []
for i in range(LOADING_TEST_SIZE):
    task = loop.create_task(send_req(i))
    tasks.append(task)

loop.run_until_complete(asyncio.wait(tasks))
