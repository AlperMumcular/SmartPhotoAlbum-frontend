var apigClient = apigClientFactory.newClient();

function searchQuery() {
	console.log("Pipeline test");
    var searchText = document.getElementById('search_query').value.trim().toLowerCase();

    document.getElementById('search_query').value = searchText;

    var params = {
        'q' : searchText
    };

    var additionalParams = {
        'headers': {
            'Content-Type': 'application/json',
        }
    };

    apigClient.searchGet(params, {}, additionalParams)
        .then(function(result) {
            image_paths = result["data"];
            var photosDiv = document.getElementById("photos_search_results");
            photosDiv.innerHTML = "";
            for (var n = 0; n < image_paths.length; n++) {
                photosDiv.innerHTML += '<figure style="display: inline-block; width: 20%;"><img src="' + image_paths[n] + '" style="width:100%"></figure>';
            }
        }).catch(function(result) {
            var photosDiv = document.getElementById("photos_search_results");
            photosDiv.innerHTML = "Image not found!!!";
        });
}

function uploadPhoto()
{
	var filePath = (document.getElementById('uploaded_file').value).split("\\");
    var fileName = filePath[filePath.length - 1];

    var file = document.getElementById("uploaded_file").files[0];
    file.constructor = () => file;

    var params = {
        'x-amz-meta-customLabels': custom_labels.value,
        "filename": fileName,
        "bucket": "alper-hw3-b2"
    };

    var additionalParams = {
        headers: {
            'Content-Type': file.type,
        }
    };

    var reader = new FileReader();
    reader.onload = function (event) {
        body = btoa(event.target.result);
        return apigClient.uploadBucketFilenamePut(params, file, additionalParams)
        .then(function(result) {
            alert('Image uploaded succesfully!!!')
        })
        .catch(function(error) {
            alert('Image could not be uploaded!!!')
        })
    }
    reader.readAsBinaryString(file);

    document.getElementById('uploaded_file').value = "";
    document.getElementById('custom_labels').value = ""; 
}
