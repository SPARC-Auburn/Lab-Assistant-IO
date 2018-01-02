/**
 * Manages installed packages and displays it on page
 */

$("#installPackage").click(function () {
    dataToSend = {
        "gitRepo": $("#packageRepoInput").val()
    }
    $.post("/packages/install", dataToSend, function (data) {
        if (data == "success") {
            listInstalledPackages();
            $.post("/command_handler/reload_packages");
        } else {
            alert(data)
        }
    })
})

function listInstalledPackages() {
    // TODO: Get enabling switch to change state of package
    // TODO: Add confirmation dialog to prompt user after uninstall is pressed
    // FIXME: When package is uninstalled, material design enable toggle becomes a checkbox until refresh
    $.get('/packages/list_packages', function (packageData) {
        var packageRows = "";
        var packageNumber = 0;
        var switch_attribute = '';
        packageData.forEach(packageInfo => {
            if(packageInfo.enabled === true){
                switch_attribute = 'checked';
            }
            else {
                switch_attribute = '';
            }
            packageRows += ''+
            '<tr>'+
                '<td class=\"mdl-data-table__cell--non-numeric\">'+packageInfo.packageName+'</td>'+
                '<td class=\"mdl-data-table__cell--non-numeric\">'+
                '<label for=\"switch-'+packageNumber+'\" class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\">'+
                    '<input id=\"switch-'+packageNumber+'\" type=\"checkbox\" class=\"mdl-switch__input\"/'+switch_attribute+'>'+
                '</label>'+
                '</td>'+
                '<td class=\"mdl-data-table__cell--non-numeric\">'+
                '<button id=\"info-'+packageNumber+'\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\">INFO</button>'+
                '</td>'+
                '<td class=\"mdl-data-table__cell--non-numeric\">'+
                '<button id=\"uninstall-'+packageNumber+'\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--accent\" onclick=\'uninstallPackage(\"'+packageInfo.packageName+'\")\'>UNINSTALL</button>'+
                '</td>'+
            '</tr>';
            packageNumber++;   
        });
        $("#packageTable").html('<thead><tr>'+
              '<th class=\"mdl-data-table__cell--non-numeric\">Package</th>'+
              '<th class=\"mdl-data-table__cell--non-numeric\">Enabled</th>'+
              '<th class=\"mdl-data-table__cell--non-numeric\">Info</th>'+
              '<th class=\"mdl-data-table__cell--non-numeric\">Uninstall</th>'+
            '</tr></thead><tbody>' + packageRows +'</tbody>')
    })
}

function uninstallPackage(packageName) {
    $.post('/packages/uninstall', {"packageName":packageName}, function(data){
        $.post('/command_handler/reload_packages')
        listInstalledPackages();
    });
}

listInstalledPackages();