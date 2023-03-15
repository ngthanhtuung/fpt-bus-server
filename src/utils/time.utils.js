const findClosestTime = (times) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

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
        // Calculate the number of minutes from the current time to the closest time
        const closestTimeMinutes = parseInt(closestTime.slice(0, 2)) * 60 + parseInt(closestTime.slice(3, 5));
        const diffMinutes = closestTimeMinutes - currentMinutes;
        const diffHours = Math.floor(diffMinutes / 60);
        const diffRemainder = diffMinutes % 60;

        let diff = "";

        if (diffHours > 0) {
            diff = `${diffHours} ${diffHours > 1 ? `hours` : `hour`} and ${diffRemainder} minutes`;
        } else {
            diff = `${diffRemainder} minutes`;
        }
        return {
            time: closestTime,
            diff: diff
        };

    } else {
        return null;
    }

}

module.exports = {
    findClosestTime
}