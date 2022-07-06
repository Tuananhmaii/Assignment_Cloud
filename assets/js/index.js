$("#add_toy").submit(function(event){
    alert("Data inserted");
})

$("#update_toy").submit(function(event){
    event.preventDefault();

    var unindexed_array=$("#update_toy").serializeArray();
    var data={}
    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })
    console.log(data); 
    var request = {
        "url":`http://localhost:3000/api/toys/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data updated");
    })
})

if(window.location.pathname =="/index"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var request = {
            "url":`http://localhost:3000/api/toys/${id}`,
            "method":"DELETE",
        }

        if(confirm("Delete this toy ?")){
            $.ajax(request).done(function(response){
                alert("Data deleted");
                location.reload;
            })
        }
    })
}