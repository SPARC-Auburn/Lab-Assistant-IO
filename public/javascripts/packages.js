$("#installPackage").click(function(){
    dataToSend = {
        "gitRepo": $("#packageRepoInput").val()
    }
    $.post("/packages/install", dataToSend, function(data){
        if(data == "success") {
            alert("Package installed sucessfully!")
            $.post("/command_handler/reload_packages");
        }
        else {
            alert(data)
        }
    })
})