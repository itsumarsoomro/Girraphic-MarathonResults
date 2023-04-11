// to the top button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
mybutton.style.display = "block";
} else {
mybutton.style.display = "none";
}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}


// url for the file where data need to to fetch
const url = "MarathonResults.json";

// getting data function from json file and populating array
async function getResults() {
	
// fetcing data from json
const response = await fetch(url);
// storing response
const data = await response.json();

return data;
}


//  info table
getResults().then(data => {
let infoData = data.results;

// race information table data parsing and populating table
raceInfo(infoData)
function raceInfo(dataa){	
let raceInfo = document.getElementById("race-info")
	let rows = `
	<tr>
					<td>${dataa.raceStatus}</td>
					<td>${dataa.gender}</td>
					<td>${dataa.racename}</td>
					<td>${dataa.tod}</td>
					<td>${dataa.lastupdated}</td>
					<td>${dataa.racelength}</td>
	</tr>
	`
	raceInfo.innerHTML += rows;
}});;


// result table with sorting functionality
getResults().then(data => {
resultData =  data.results.athletes;

// sorting function
$(".th-elements--sort").on('click', function(){
	let column = $(this).data('column')
	let order = $(this).data('order')
	var symbol = $(this).html()
	symbol = symbol.substring(0, symbol.length - 1)

	if(order == 'desc'){
		$(this).data('order', 'asc')
		resultData = resultData.sort((a,b) => a[column] > b[column] ? 1 : - 1)
		symbol += '&#9650';
	}else{
		$(this).data('order', 'desc')
		resultData = resultData.sort((a,b) => a[column] < b[column] ? 1 : - 1)
		symbol += '&#9660';
	}
	$(this).html(symbol)
	buildTable(resultData)
})

// race results table data parsing and populating table
buildTable(resultData)

function buildTable(data){

let raceResults = document.getElementById("race-results")
// setting the table to empty for sorting
raceResults.innerHTML = ''
// populating the table by for loop so in case new data is added in json the table will be updated by itself!
for (let i = 0; i < data.length; i++){
	let row = `<tr>
					<td>${data[i].rank}</td>
					<td>${data[i].firstname}</td>
					<td>${data[i].surname}</td>
					<td>${data[i].athleteid}</td>
					<td>${data[i].finishtime}</td>
					<td>${data[i].raceprogress}</td>
					<td>${data[i].teamname}</td>
					<td>${data[i].bibnumber}</td>
					<td>${data[i].flag}</td>
					<td>${data[i].countryname}</td>
			</tr>`
	raceResults.innerHTML += row

}
}
})



// exporting formating csv
getResults().then(data => {

// structured csv file to be exported
const exportCSVBtn = document.getElementById("d2-btn");
exportCSVBtn.addEventListener("click", () => {
	let data = resultData;
	const result = data.map((item) => {
		const { rank, firstname, surname, finishtime, flag } = item;
	return {Rank: `${rank}`, "Full Name": `${firstname} ${surname}`, "Finish Time": `${finishtime}`, "Country Code": `${flag}`}
	})

	data = result;

	const fileName = 'race_results'
	const exportType = 'csv';
	
	window.exportFromJSON({ data, fileName, exportType })
})
})











