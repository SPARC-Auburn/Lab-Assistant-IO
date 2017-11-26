$("#installPackage").click(function(){
    dataToSend = {
        "gitRepo": $("#packageRepoInput").val()
    }
    $.post("/packages/install", dataToSend, function(data){
        if(data == "success") {
            alert("Installed Succesfully!");
        }
        else {
            alert("Failed to install package")
        }
    })
})