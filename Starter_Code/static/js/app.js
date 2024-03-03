// URL to the dataset
const datasetUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(datasetUrl).then(data => {
    // Verify the data structure and accessibility
    console.log(data); 
    createDropdownMenu(data.samples);
    const currentSampleId = data.samples[0].id;
    // Verify currentSampleID
    console.log(currentSampleId)
    
    });

    // Function creatDropdownMenu.
function createDropdownMenu(samples) {
    let dropdownMenu = d3.select("#selDataset");
    samples.forEach(sample => {
        dropdownMenu.append("option").text(sample.id).property("value", sample.id);
})};

// Function - updatevisualisations
function updateVisualizations(sampleId, data) {
    updateBarChart(sampleId, data);
    updateBubbleChart(sampleId, data);
    updateMetadata(sampleId, data);
}
 
// Function - updateBarChart.
function updateBarChart(sampleId, data) {
    d3.json(datasetUrl).then(data => {
        const samples = data.samples;
        const resultArray = samples.filter(sample => sample.id == sampleId);
        const result = resultArray[0];
        
        const otu_ids = result.otu_ids;
        const otu_labels = result.otu_labels;
        const sample_values = result.sample_values;
        
        // Trace for the bar chart
        var trace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };

      //  var data = [trace];
        var layout = {
            title: "Top 10 OTUs Found",
        };

        Plotly.newPlot("bar", [trace], layout);
    });
}

// Function- updata Bubble Chart
function updateBubbleChart(sampleId, data) {
    d3.json(datasetUrl).then(data => {
        // Find the selected sample from the samples array
        const selectedSample = data.samples.find(sample => sample.id === sampleId);
        
        if (!selectedSample) {
            console.error("Sample ID not found:", sampleId);
            return; // Exit the function if the sample ID is not found
        }
        
        // Extract data for plotting: otu_ids, sample_values, and otu_labels
        const otu_ids = selectedSample.otu_ids;
        const sample_values = selectedSample.sample_values;
        const otu_labels = selectedSample.otu_labels;
        
        // Now, use the extracted data to create a trace for the bubble chart

        var trace = {
            x: otu_ids, // Data for the X-axis
            y: sample_values, // Data for the Y-axis
            text: otu_labels, // Hover text
            mode: 'markers',
            marker: {
                size: sample_values, // Marker size
                color: otu_ids, // Marker color
                colorscale: 'Earth'
        }
    };
    var layout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' },
        height: 600,
        width: 1000,
        showlegend: false
        };
     Plotly.newPlot('bubble', [trace], layout);
    });
}

// Function updateMetadata
function updateMetadata(sampleId, data) {
    d3.json(datasetUrl).then(data => {
        const metadata = data.metadata;
        const result = metadata.find(meta => meta.id.toString() === sampleId);
        
        // Select the metadata display area
        const displayArea = d3.select("#sample-metadata");

        // Clear existing metadata
        displayArea.html("");

        // Append new metadata
        Object.entries(result).forEach(([key, value]) => {
            displayArea.append("p").text(`${key}: ${value}`);
        });
      })
}
// First Pass Visualistation
d3.json(datasetUrl).then(data => {
    const currentSampleId = data.samples[0].id;
        updateVisualizations(currentSampleId, data);
});

// Subsequent Passes Visualisation
d3.select("#selDataset").on("change", function() {
    const selectedSampleId = d3.select(this).property("value");
        updateVisualizations(selectedSampleId);
});
