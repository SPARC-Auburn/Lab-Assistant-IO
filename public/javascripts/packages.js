$("#installPackage").click(function () {
    dataToSend = {
        "gitRepo": $("#packageRepoInput").val()
    }
    $.post("/packages/install", dataToSend, function (data) {
        if (data == "success") {
            alert("Package installed sucessfully!")
            listInstalledPackages();
            $.post("/command_handler/reload_packages");
        } else {
            alert(data)
        }
    })
})

function listInstalledPackages() {

    $.get('/packages/list_packages', function (packageData) {
        var packageRows = "";
        packageData.forEach(packageInfo => {
            packageRows += "<tr><td>" + packageInfo.packageName + "</td><td><button>Uninstall</button></td><td><button>Configure</button></td><td><button>Info</button></tr>"
        });
        $("#packagesTable").html(
            "<tr><th>Package Name</th><th>Uninstall</th><th>Config</th><th>More Info</th>" + packageRows
        )
    })
}

listInstalledPackages();