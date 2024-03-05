
![BellyButton_App](https://github.com/JerryJaye/belly-button-Challenge/assets/144417761/852c9421-95cf-4420-a7fb-f1e37e036f9d)

Introduction

The Belly Button Biodiversity Project introduced me to many of the concepts of Java Script, Plot.ly and D3. It was a steep learning experience. I took the opportunity to view several tutorial videos on YouTube and see how JSON libraries can assist in reading and processing data in cases like this.

The Database

We were provided with a database comprising three arrays called 'names', a list of 'id' values; 'metadata', a list of dictionaries containing demographic key/value pairs;  and 'samples', and a list of dictionaries containing sample descriptions key/value pairs. This we had a variety of data structures to extract and process from.

Process

Initially, I downloaded the database and spent time examining its structures. The first thing after that was to create a dropdown menu from a list of id values. Fortunately the "names" list of id, the samples id: value, and the meta id: value were all the same figure. They were stored as strings except for the metadata.id value, which had to be converted to a string. After creating the dropdown menu I created the Bar Chart, followed by the Bubble Chart. 

At this stage, I rethought the project. I decided that it would be wise to download and assess the data, create functions to create the dropdown menu, update all of the visualisation charts, and create the bar chart, bubble chart and Metadata display. Once I had all the functions I would call them as required. The chart and data processing functions are called updateBarChart(sampleId, data), updateBubbleChart(sampleId, data), updatemetadata (sampleId, data) and updateBellyButtonWas(sampleId, data). Each function was passed the current sampleId and the total database. On receiving the sampleId and data it retrieved the appropriate data values required to complete the display for the currently selected sample. the function then plotted the display.

After completing all the functions, I wrote code to update all of the displays in the first instance, that is when first running the code. After that the code to trigger an update on selecting a new sample.

Running the Program

The app program is called app.js, and its associated HTML file is called index.html. I haven't had time to use css to polish up the style. I have run the program in Visual Studio. When the program is opened in VS then click on Index to open Chrome. Use the drop-down menu to select new samples and each display will update.

Deploy to a GitHub free static page

I have deployed to this page. URL is https://jerryjaye.github.io/belly-button-Challenge/.

References
