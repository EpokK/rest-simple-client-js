function send()
{
	$(".btn-send").button('loading');
	$("#result").removeClass('alert-success');
	$("#result").removeClass('alert-error');
	$("#result").html('/* Resultat de la requ&ecirc;te */');

	$('input[type=hidden]').remove();

	$('input.input-name').each(function(i, input) { 
		$("#data").append(
			'<input type="hidden" name="' + $(input).val() + '" value="' + $('#' + input.parentNode.id + ' input.input-value').val() + '" />'
		);
	});

	$.ajax({
		url: $("#link").val() + $("#entry").val(),
		cache: false,
		data: $("#data").serialize(),
		type: $("#method").val(),
		success: function(data) {
			$(".btn-send").button('reset');
			$("#result").addClass('alert-success');
			$("#result").html(JSON.stringify(data, undefined, 2));
		},
		error: function(data) {
			$("#result").addClass('alert-error');
			$(".btn-send").button('reset');
			if(typeof(data) == 'object') {
				$("#result").html(JSON.stringify(data, undefined, 2));
			} else {
				$("#result").html(data);
			}
		}
	});
}

function add_param()
{
	var id = Math.round(new Date().getTime() / 1000);
	$(".btn-addparam").before(
		'<div id=' + id + '>' +
			'<input type="text" class="input-name" placeholder="Param&egrave;tre"> ' +
			'<input type="text" class="input-value" placeholder="Valeur"> ' +
			'<a href="#" class="btn btn-danger" onclick="remove_param(' + id + ')">Supprimer</a>' +
		'</div>'
	);
}

function remove_param(id) {
	$("#" + id).remove();
}

function reset() {
	$("#data").html(
		'<div id="first-param">' +
			'<input type="text" class="input-name" placeholder="Param&egrave;tre"> ' +
			'<input type="text" class="input-value" placeholder="Valeur"> ' +
		'</div>' + 
		'<a href="#" class="btn btn-primary btn-addparam" onclick="add_param()">Ajouter un param&egrave;tre</a> ' +
		'<a href="#" class="btn btn-warning" onclick="reset()">Reset</a>'
	);
}