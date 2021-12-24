import { QueueServiceClient } from '@azure/storage-queue';


( async () => {
    const connectionString = process.env.storageConnectionString ?? undefined;
    const queueName = process.env.queueName ?? undefined;

    if (!connectionString || queueName) { 
        console.error('connectionString or queueName not found');
        return;
    }

    let contents = [{ message: 'this is a sample message' }];
    await sendQueueMessage(contents, connectionString, queueName);
})();

/**
 * to send messages to an Azure queue by connectionString and queueName
 * @param contents - Contents you wants to send.
 * @param connStr - connectionString for Azure Storage.
 * @param queueName - queue name to send the messages.
 */
async function sendQueueMessage(contents: string | string[] | object[], connStr: string, queueName: string) {
    try {
        const queueServiceClient = QueueServiceClient.fromConnectionString(connStr);
        const queueClient = queueServiceClient.getQueueClient(queueName);
        
        if (Array.isArray(contents)) {
            for (const content of contents) {
                const _ = await queueClient.sendMessage(btoa(JSON.stringify(content)));
                // handle the response if you want
            }
        } else {
            const _ = await queueClient.sendMessage(contents);
            // handle the response if you want
        }
    } catch (err) {
        console.error(err);
    }
}