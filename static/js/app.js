const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get the JSON data using d3
d3.json(url).then(function(data) {
  console.log(data);
});

// Create a function to update data with a dropdown list
function init() {
  // Use d3 to initialize a d3 dropdown
  let dropdownMenu = d3.select("#selDataset");

  // Use d3 to populate the dropdown list
  d3.json(url).then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((id) => {
      dropdownMenu.append("option")
        .text(id)
        .property("value", id);
    });

    let first_sample = sampleNames[0];
    buildMetadata(first_sample);
    buildBarChart(first_sample);
    buildBubbleChart(first_sample);
  });

  // Add event listener to the dropdown menu
  dropdownMenu.on("change", function() {
    let selectedSample = d3.select(this).property("value");
    updateDashboard(selectedSample);
  });
}

// Function that generates Metadata
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let metadataArray = metadata.filter((result) => result.id == sample);
    let first_index = metadataArray[0];

    d3.select("#sample-metadata").html("");

    Object.entries(first_index).forEach(([key, value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

// Bar chart function
function buildBarChart(sample) {
  d3.json(url).then((data) => {
    let info = data.samples;
    let values = info.filter((result) => result.id == sample);
    let dataArray = values[0];

    let otu_ids = dataArray.otu_ids;
    let otu_labels = dataArray.otu_labels;
    let sample_values = dataArray.sample_values;

    let yticks = otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse();
    let xticks = sample_values.slice(0, 10).reverse();
    let labels = otu_labels.slice(0, 10).reverse();

    let trace = {
      x: xticks,
      y: yticks,
      text: labels,
      type: "bar",
      orientation: "h",
    };

    let layout = {
      title: "Top 10 Most Common OTUs",
    };

    Plotly.newPlot("bar", [trace], layout);
  });
}

// Bubble chart function
function buildBubbleChart(sample) {
  d3.json(url).then((data) => {
    let info = data.samples;
    let values = info.filter((result) => result.id == sample);
    let dataArray = values[0];

    let otu_ids = dataArray.otu_ids;
    let otu_labels = dataArray.otu_labels;
    let sample_values = dataArray.sample_values;

    let trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
      },
    };

    let layout2 = {
      xaxis: { title: "OTU IDs" },
      hovermode: "closest",
      title: "Rate of OTUs",
    };

    Plotly.newPlot("bubble", [trace2], layout2);
  });
}

// Update the dashboard
function updateDashboard(selectedSample) {
  buildMetadata(selectedSample);
  buildBarChart(selectedSample);
  buildBubbleChart(selectedSample);
}

// Call the initial function
init();
