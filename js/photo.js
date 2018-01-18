var albumBucketName = 'alex-chen-cool-photos';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:20c8e41f-fd64-4051-8c70-05939a1e4831';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});


function viewAlbum() {
  s3.listObjects({}, function(err, data) {
    if (err) {
      return alert('There was an error viewing your album: ' + err.message);
    }
    var bucketUrl = "https://s3.amazonaws.com/" + albumBucketName + '/';
    addAllPhotos(bucketUrl, data)
  });
}

function addPhoto() {
  var files = document.getElementById('photoupload').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
  var photoKey = files[0].name;
  s3.upload({
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    alert('Successfully uploaded photo.');
    viewAlbum();
  });
}

function deletePhoto(photoKey) {
  s3.deleteObject({Key: photoKey}, function(err, data) {
    if (err) {
      return alert('There was an error deleting your photo: ', err.message);
    }
    alert('Successfully deleted photo.');
    viewAlbum();
  });
}




