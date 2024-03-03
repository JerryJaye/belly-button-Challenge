//Get the BellyButton endpoint
const bellybutton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(bellybutton).then(data => {
    let samples = data.samples;

    // Populate dropdown menu with sample IDs
    let dropdownMenu = d3.select("#selDataset");
    data.names.forEach(id => {
      dropdownMenu.append("option").text(id).property("value", id);
    });
    if(data.names.length >  0) {
        updateBarChart(data.names[0]);
    }
});

function updateBarChart(sampleId) {
    d3.json(bellybutton).then(data => {
        let sample = data.samples.find(s => s.id === sampleId);
        if (!sample) {
            console.error("Sample ID not found:", sampleId);
            return;
        }
        
        // Extracting top 10 OTU IDs, sample values, and labels for the selected sample
        let otuIds = sample.otu_ids.slice(0, 10).reverse();
        let sampleValues = sample.sample_values.slice(0, 10).reverse();
        let otuLabels = sample.otu_labels.slice(0, 10).reverse();

        // Plotly: Plotting the bar chart
        let trace = {
            x: sampleValues,
            y: otuIds.map(id => `OTU ${id}`),
            text: otuLabels,
            type: 'bar',
            orientation: 'h'
        };
        let layout = {
            title: `Top 10 OTUs for Sample ID ${sampleId}`

        };
        Plotly.newPlot('bar', [trace], layout);
    });
}
d3.select("#selDataset").on("change", function() {
    let selectedId = d3.select(this).property("value");
    updateBarChart(selectedId);
});
console.log("This is after Plotting Bar Chart");

// Create a Bubble Chart Section
// Create a Bubble Chart Function

// function updateBubbleChart(sampleId) {
//     d3.json("path/to/your/data.json").then(data => {
//         // Assuming `data.samples` contains the samples data
//         let selectedSample = data.samples.find(sample => sample.id === sampleId);

//         let otuIds = selectedSample.otu_ids;
//         let sampleValues = selectedSample.sample_values;
//         let otuLabels = selectedSample.otu_labels;

//         // Setup the trace for the bubble chart
//         let trace = {
//             x: otuIds,
//             y: sampleValues,
//             text: otuLabels,
//             mode: 'markers',
//             marker: {
//                 size: sampleValues,
//                 color: otuIds,
//                 colorscale: 'Earth' // This is an example colorscale
//             }
//         };

//         let layout = {
//             title: 'Bacteria Cultures Per Sample',
//             xaxis: { title: 'OTU ID' },
//             yaxis: { title: 'Sample Values' },
//             hovermode: 'closest',
//         };

//         Plotly.newPlot('bubble', [trace], layout);
//     });
// }
// console.log("OK to after bubble chart function")

// d3.select("#selDataset").on("change", function() {
//     let selectedId = d3.select(this).property("value");
//     updateBubbleChart(selectedId);
// });


// Display a Sample's Metadata
// function updateMetadata(sampleId) {
//     d3.json("path/to/your/data.json").then(data => {
//         let metadata = data.metadata;
//         let result = metadata.find(meta => meta.id.toString() === sampleId);

//         let displayPanel = d3.select("#sample-metadata .panel-body");
//         displayPanel.html(""); // Clear existing metadata

//         Object.entries(result).forEach(([key, value]) => {
//             displayPanel.append("p").text(`${key.toUpperCase()}: ${value}`);
//         });
//     });
// }
// console.log("OK to after metadata function")