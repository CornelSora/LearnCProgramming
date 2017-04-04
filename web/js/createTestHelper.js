var i = 0;
function adaugaFunctii() {
    var fcGroup = $("#functii-group");
    i++;
    var divGrup = $("<div class='form-inline' id='functii-group'><br/></div>");
    var labelDenumire = $("<label>Denumire: </label>");
    var inputDenumire = $("<input id=denumireFunctie" + i + " class='form-control' placeholder='Numele functiei'></input><br/>");
    divGrup.append(labelDenumire);
    divGrup.append(inputDenumire);
    var labelTipReturnat = $("<label>Tip returnat: </label>");
    var inputTipReturnat = $("<input id=tipReturnat" + i + " class='form-control' placeholder='Tipul returnat al functiei'></input><br/>");
    divGrup.append(labelTipReturnat);
    divGrup.append(inputTipReturnat);
    fcGroup.append(divGrup);
}
var j = 0;
function adaugaInputOutput() {
    j++;
    var fcGroup = $("#testGroup");
    var divInput = $('<div style="float: left; width: 40%; display: block;"></div>');
    var labelInput = $('<label>Input:</label>');
    var textareaInput = $('<textarea id="Input' + j + '" name="Input' + j + '" class="form-control" rows="10"></textarea>');
    divInput.append(labelInput);
    divInput.append(textareaInput);
    var divOutput = $('<div style="margin-left: 50%; width: 40%; display: block"></div>');
    var labelOutput = $('<label>Output:</label>');
    var textareaOutput = $('<textarea id="Output' + j + '" name="Output' + j + '" class="form-control" rows="10"></textarea><br/>');
    divOutput.append(labelOutput);
    divOutput.append(textareaOutput);
    fcGroup.append(divInput);
    fcGroup.append(divOutput);
}