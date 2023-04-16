const DNS_TYPE = [
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "PTR",
    "TXT",
]

const TTL = [
    { title: "Auto", value: 1 },
    { title: "1 min", value: 60 },
    { title: "2 min", value: 120 },
    { title: "5 min", value: 300 },
    { title: "10 min", value: 600 },
    { title: "15 min", value: 900 },
    { title: "30 min", value: 1800 },
    { title: "1 hr", value: 3600 },
    { title: "2 hr", value: 7200 },
    { title: "5 hr", value: 5 * 3600 },
    { title: "12 hr", value: 12 * 3600 },
    { title: "1 day", value: 24 * 3600 },
]

export { DNS_TYPE, TTL }
