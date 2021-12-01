//upload image
//upload image logo on load
//call api
//call api with oauth
//backend need to create oauth
//authentication

const api_key="aLAAjmYTlEqTExgItn4nH2U1lLIPgwB9";

document.addEventListener("DOMContentLoaded", init);
const model = ["images", "title", "type"];
function init(){
	document.getElementById("users").addEventListener("click", e => {
		e.preventDefault();
		// let headers = new Headers();
		// headers.append('Content-Type', 'application/json');
  //   	headers.append('Accept', 'application/json');

		// let url = "http://localhost:8080/api/usersInfo";
		let url = "https://api.giphy.com/v1/gifs/trending?api_key="+api_key+"&limit=5&offset=0";
		let newTable = document.querySelector("usersInfo");
		let table = document.createElement("table");
		let tr = document.createElement("tr");
		let headers = new Headers();

	    headers.append('Content-Type', 'application/json');
	    headers.append('Accept', 'application/json');
	    document.querySelector("#usersInfo").insertAdjacentElement('beforebegin', table);
		fetch(url, {
			headers: headers
		})
		.then(res => res.json())
		.then( (contents) => {

			model.forEach(key => {
				let th = document.createElement("th");
				let text = document.createTextNode(key);
				th.appendChild(text);
				tr.appendChild(th);
			});
			table.appendChild(tr);

			contents.data.forEach(data => {
				let row = document.createElement("tr");
				Object.keys(data).forEach(key => {
					let cell = document.createElement("td");
					if(model.includes(key)){

						
						if(key.includes("images")){
							let fig = document.createElement("figure");
							let img = document.createElement("img");
							img.src = data[key].downsized.url;
							img.alt = data["title"];
							img.width= "100";
							img.height="100";
							fig.appendChild(img);
							row.appendChild(fig);
						}else {
							let cellText = document.createTextNode(data[key]);
							cell.appendChild(cellText);
							row.appendChild(cell);
						}
				
					}
					
				});
				table.appendChild(row);
			});


			newTable.appendChild(table);

		}).catch( err => {
			console.log(err);
		});
	});
	document.getElementById("searchButton").addEventListener("click", (e) => {
		e.preventDefault();
		let url = "https://api.giphy.com/v1/gifs/trending?api_key="+api_key;
		// let searchInput = document.getElementById("search").value.trim();
		// url = url.concat(searchInput);
		console.log(url);
		fetch(url)
		.then(res => res.json())
		.then( (contents) => {
			let div = document.createElement("div");
			contents.data.forEach((content) => {
				let fig = document.createElement("figure");
				let img = document.createElement("img");
				let fc = document.createElement("figcaption");
				img.src = content.images.downsized.url;
				img.alt = content.title;
				fc.textContent = content.title;
				fig.appendChild(img);
				fig.appendChild(fc);
				div.appendChild(fig);
			});
			
			document.querySelector("#showData").insertAdjacentElement('beforebegin', div);
			console.log("end");
		})
		.catch( (err) => {
			console.error(err);
		});
	});
}

