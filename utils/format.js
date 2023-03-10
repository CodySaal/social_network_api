// Example output: Jun 9th, 2020 at 04:31 pm
const formatDate = (date) => {
    let formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(date)

    let formattedTime = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
        hour12: true,
    }).format(date)

    return `${formattedDate} at ${formattedTime}`
}

module.exports = { formatDate }