

// cette fonction m'a servi lorsque j'ai voulu affiché un objet "circulaire"
function simpleStringify (object){
			var simpleObject = {};
			for (var prop in object ){
				if (!object.hasOwnProperty(prop)){
					continue;
				}
				if (typeof(object[prop]) == 'object'){
					continue;
				}
				if (typeof(object[prop]) == 'function'){
					continue;
				}
				simpleObject[prop] = object[prop];
			}
			console.log(JSON.stringify(simpleObject)); // returns cleaned up JSON
		}