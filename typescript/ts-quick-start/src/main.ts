/**
 * @description function main as a temporary func to demonstrate the func works.
 */
export async function main() {

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }    

    await sleep(300);
    console.info('Hello world');

}


( async () => {
    await main();
})();