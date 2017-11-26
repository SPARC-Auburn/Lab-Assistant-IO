$("#installPackage").click(function(){
    dataToSend = {
        "gitRepo": $("#packageRepoInput").val()
    }
    $.post("/packages/install", dataToSend, function(data){
        if(data == "success") {
            $.post("/command_handler/reload_packages");
        }
        else {
            alert("Failed to install package")
        }
    })
})