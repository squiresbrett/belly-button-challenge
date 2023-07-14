
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Get the JSON data using d3
d3.json(url).then(function(data) {
    console.log
})
//Create a function to update data with a dropdown list
function init() {

    //Use d3 to initialize a d3 dropdown
    let dropdownMenu = d3.select("#selDataset");

    //Use d3 to populate the dropdown list
    d3.json(url).then((data) => {

        let sampleNames = data.names;

        names.forEach((id) => {

            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        let first_sample = sampleNames[0];
        //console.log(first_sample);

        buildMetadata(first_sample);
        buildBarChar(first_sample);
        buildBubbleChart(first_sample);
        buildGaugeChart(first_sample);
            
        });
    };

//Function that generates Metadata
function buildMetadata(sample) {

    d3.json(url).then((data) => {
       
        //Retrieve metadata to use and filter the metadata
        let metadata = data.metadata;

        let metadataArray = metadata.filter(results => results.id == sample);
        
        //Log the filtered data
        console.log(metadataArray)

        let first_index = metadataArray[0]

        //Clears prior metadata
        d3.select("#sample-metadata").html("");

        //Adds each key value pair to the panel
        Object.entries(first_index).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};