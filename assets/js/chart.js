$.ajax({
	type: "GET",
	dataType: "json",
	url: "/allTests",
}).done(function(results) {
	if (results.error === true) {
		alert(results.message);
		return console.error(results.message);
	}
	// TODO: Handle this in the backend, not the front. Takes some
	// weight off the browser
	
	let chartLabels = [];
	let ping = [];
	let dnld = [];
	let upld = [];

	for(let result of results) {
		chartLabels.push(result.value.time);
		ping.push(result.value.ping);
		dnld.push(result.value.download);
		upld.push(result.value.upload);
	}

	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
    type: 'line',
    data: {
			labels: chartLabels,
        datasets: [{
          label: 'Ping (ms)',
          data: ping,
					borderColor: "rgba(0,0,255,0.75)",
					lineTension: 0,
					fill: false
        },
				{
					label: 'Download (Mb/s)',
					data: dnld,
					borderColor: "rgba(255,0,0, 0.75)",
					lineTension: 0,
					fill: false
				},
				{
					label: 'Upload (Mb/s)',
					data: upld,
					borderColor: "rgba(0,255,0, 0.75)",
					lineTension: 0,
					fill: false
				}]
    },
    options: {

    }
});

}).fail(function(err) {
	window.alert(err.message);
	console.error(err);
});