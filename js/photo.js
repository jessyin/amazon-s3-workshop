var albumBucketName = 'alex-chen-cool-photos';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:20c8e41f-fd64-4051-8c70-05939a1e4831';


//update the configurations for AWS to use our credentials
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

//create an S3 instance that we can use to access the databaseph
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

//get all the data from the bucket and call addAllPhotos to display it
function viewAlbum() {

}

//adds a photo to our S3 database
function addPhoto() {
  //get the file out of the upload widget	
  var files = document.getElementById('photoupload').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
  var photoKey = files[0].name;
  //TODO: upload the file to s3


}




