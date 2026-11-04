 	/* sidebar_right open and close. */
	const menuButton = document.getElementById('menu_list');
	const sidebar_left = document.getElementById('sidebar_left');	
	 	menuButton.addEventListener('click', (event) => {
	 		sidebar_left.classList.toggle('open');
	 		event.stopPropagation(); 
	 	});
		document.addEventListener('click', (event) => {
		 		if (!sidebar_left.contains(event.target) && !menuButton.contains(event.target)) {
		 			sidebar_left.classList.remove('open');
		 		}
		 });