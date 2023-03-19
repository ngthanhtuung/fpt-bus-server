const findClosestTime = (times) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = currentMinutes * 60 + now.getSeconds();

    // Sort the times in ascending order
    const sortedTimes = times.sort();

    // Find the index of the first time after the current time
    const index = sortedTimes.findIndex(time => {
        const timeMinutes = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
        return timeMinutes >= currentMinutes;
    });

    // If there is no time after the current time, wrap around to the first time in the array
    const closestTime = index === -1 ? null : sortedTimes[index];

    if (closestTime != null) {
        // Calculate the number of seconds from the current time to the closest time
        const closestTimeMinutes = parseInt(closestTime.slice(0, 2)) * 60 + parseInt(closestTime.slice(3, 5));
        const closestTimeSeconds = closestTimeMinutes * 60;
        const diffSeconds = closestTimeSeconds - currentSeconds;
        // const diffHours = Math.floor(diffSeconds / 3600);
        // const diffMinutes = Math.floor((diffSeconds % 3600) / 60);
        // const diffRemainder = diffSeconds % 60;
        let diff = parseInt(diffSeconds);
        if (diff > 0) {
            return {
                time: closestTime,
                diff
            };
        } else {
            return null;
        }
    } else {
        return null;
    }

}

module.exports = {
    findClosestTime
}