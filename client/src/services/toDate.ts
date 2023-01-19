export const toDate = (timestamp:string) => {
    const isoTimestamp = timestamp;
    const date = new Date(isoTimestamp);
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    }
}

