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