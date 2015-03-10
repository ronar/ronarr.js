(function () {
	var window = this;

	function assignClick (e) {
		e.stopPropagation();
		var expanded;
		expanded = $(this).data('expanded');
		expanded = !expanded;
		
		$(this).data('expanded', expanded);

		var child;
		child = $(this).children();

		console.log(this);

		if (expanded)
			$(child[1]).css({display: 'none'});
		else
			$(child[1]).css({display: 'block'});
	}

	ronarr = window.ronarr = function () {
		return ronarr.ron.init ();
	}

	ronarr.ron = ronarr.prototype = {
		init: function () {
			return this;
		},

		arr_output: function (objToOutput) {
			var arrayToOutput, divNode, divNodeParent, child;
			var i, j, k;

			function createDiv(divId, divClass, divHtml) {
				var tempDiv;

				tempDiv = document.createElement('div');
				tempDiv.id = divId;
				tempDiv.className = divClass;
				tempDiv.innerHTML = divHtml;

				return tempDiv;
			}

			$('#level').remove();
				
			divNodeParent = createDiv('level', 'test-class', '<h2>Click me to expand</h2><div class="test-body"><p></p></div>');

			document.body.appendChild(divNodeParent);

			divNodeParent.addEventListener('click', assignClick, false)

			arrayToOutput = objToOutput;//;Object.keys(objToOutput);

			for (i = 0; i < arrayToOutput.length; i++)
			{
				//if (Object.keys(objToOutput[i+1]) !== undefined)
				//	arrayToOutput[i] = Object.keys(objToOutput[i+1]);

				if ((arrayToOutput[i].length > 1)&&(typeof(arrayToOutput[i]) !== 'string'))
				{
					divNodeParent = createDiv('level1' + i, 'test-class', '<h2>Click me to expand level1' + i + '</h2><div class="test-body"><p>' + arrayToOutput[i] + '</p></div>');
					child = $('#level').children();
					$(child[1]).append(divNodeParent);
					divNodeParent.addEventListener('click', assignClick, false);

					for (j = 0; j < arrayToOutput[i].length; j++)
					{
						//arrayToOutput[i][j] = Object.keys(objToOutput[i+1][j+1]);
					
						if ((arrayToOutput[i][j].length > 1)&&(typeof(arrayToOutput[i][j]) !== 'string'))
						{
							divNodeParent = createDiv('level2' + i + j, 'test-class', '<h2>Click me to expand level2' + i + j + '</h2><div class="test-body"><p>' + arrayToOutput[i][j] + '</p></div>');
							child = $('#level1' + i).children();
							$(child[1]).append(divNodeParent);
							divNodeParent.addEventListener('click', assignClick, false)
							
							for (k = 0; k < arrayToOutput[i][j].length; k++)
							{
								//arrayToOutput[i][j][k] = Object.keys(objToOutput[i+1][j+1][k+1]);

								if (arrayToOutput[i][j].length > 1) {
									divNode = createDiv('level3' + i + j + k, 'test-class', '<h2>And me! level3' + i + j + k + '</h2><div class="test-body"><p>' + arrayToOutput[i][j][k] + '</p></div>');
									child = $('#level2' + i + j).children();
									$(child[1]).append(divNode);
									divNode.addEventListener('click', assignClick, false)
								}
							}
						}
						else
						{
							divNode = createDiv('level2' + i + j, 'test-class', '<h2>And me!  level2' + i + j +'</h2><div class="test-body"><p>' + arrayToOutput[i][j] + '</p></div>');
							child = $('#level1' + i).children();
							$(child[1]).append(divNode);
							divNode.addEventListener('click', assignClick, false)
						}
					}
				}
				else
				{
					divNode = createDiv('level1' + i,  'test-class', '<h2>And me! level1' + i + '</h2><div class="test-body"><p>' + arrayToOutput[i] + '</p></div>');
					child = $('#level').children();
					$(child[1]).append(divNode);
					divNode.addEventListener('click', assignClick, false)

					//console.log(array_to_output[i]);
				}
			}
			//$('level').html('</div>');

			return this;
		}
	}

	ronarr.ron.init.prototype = ronarr.ron;
})();