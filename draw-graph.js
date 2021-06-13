const classColors = {
    "Druid": "#ff7d0a",
    "Hunter": "#a9d271",
    "Mage": "#40c7eb",
    "Paladin": "#f58cba",
    "Priest": "#ffffff",
    "Rogue": "#fff569",
    "Shaman": "#0070de",
    "Warlock": "#8787ed",
    "Warrior": "#c79c6e",
}

const secondsToString = (seconds) => {
    let result = ''
    const days = seconds / (24*60*60) | 0
    if (days) {
        result += `${days} days, `
    }
    seconds -= days*24*60*60
    const hours = seconds / (60*60) | 0
    if (hours) {
        result += `${hours} hours, `
    }
    seconds -= hours * 60 * 60
    const minutes = seconds / 60 | 0
    if (minutes) {
        result += `${minutes} minutes`
    }
    return result
}

const loadedLibrary = () => {
    const graphElement = document.getElementById("graph");
    console.log(graphData)
    const plotData = []
    const names = Object.keys(graphData).sort()

    for(const name of names) {
        console.log(name)
        const x = []
        const y = []
        const text = []
        const levels = Object.keys(graphData[name].levels).sort()
        for(const level of levels) {
            const time = graphData[name].levels[level]
            x.push(new Date(1000*time).toISOString())
            y.push(level)
            text.push(`${level} after ${secondsToString(time - 1622584800)}`)
        }
        let trace = {
            unitKey: name,
            x,
            y,
            text,
            type: "scatter",
            mode: "lines+markers",
            name: name,
            hoverinfo: "text+name",
            line: {color: classColors[graphData[name].className]},
            marker: {line: {width: 3, color: classColors[graphData[name].className]}}
        };
        plotData.push(trace);

    }


    Plotly.newPlot(graphElement, plotData, {
        title: `Tempus TBC Race to 70`,
        titlefont: {color: "#fff"},
        xaxis: {
            range: ['2021-06-01', '2021-06-13T16:00'],
            type: 'date'
        },
        yaxis: {
            range: [59, 70.5],
            type: 'linear'
        },
        // xaxis: {
        //     title: "Time (s)",
        //     titlefont: {color: "#fff"},
        //     tickcolor: "#666",
        //     tickfont: {color: "#fff"},
        //     rangemode: "tozero",
        //     gridcolor: "#666",
        //     linecolor: "#999",
        //     // range: plotXRange.slice()
        // },
        // yaxis: {
        //     title: "Threat",
        //     titlefont: {color: "#fff"},
        //     tickcolor: "#666",
        //     tickfont: {color: "#fff"},
        //     rangemode: "tozero",
        //     gridcolor: "#666",
        //     linecolor: "#999"
        // },
        width: 1920,
        height: 1080,
        hovermode: "closest",
        plot_bgcolor: "#222",
        paper_bgcolor: "#222",
        legend: {font: {color: "#fff"}}
    });
}
