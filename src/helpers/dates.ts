const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const offset = ["-5", "+1", "+8"]; // NA, EU, Asia

export function createDateObject(date: string) {
    const formatDate = (date: string, offset: string) =>
        `${date.split(" ").slice(0, 2).join(" ").replace(/-/g, "/")}${offset}`;

    let dateObj;
    if (date.endsWith("UTC+8")) {
        dateObj = new Date(formatDate(date, "+8"));
    } else {
        dateObj = new Date(formatDate(date, offset[0]));
    }

    const arr = dateObj.toLocaleString().split(",");

    const dateArr = arr[0].split("/");
    const month = months[Number(dateArr[0]) - 1];
    const day = parseInt(dateArr[1], 10).toString();
    const year = dateArr[2];
    const dateString = `${month} ${day}, ${year}`;

    const timeArr = arr[1].trim().split(" ");
    const timestamp = `${timeArr[0].split(":").splice(0, 2).join(":")} ${
        timeArr[1]
    }`;

    return { obj: dateObj, date: dateString, time: timestamp };
}

export function isCurrentBanner(start: Date, end: Date) {
    const today = new Date();
    return today >= start && today < end;
}
