s3url="s3://dogs-search/"
cfDist=E3LWN8LZPT7FY8
echo "Will delete old build"
sudo rm -rf build
echo "Deleted old build"
echo "Make sure dependencies are installed"
npm i
echo "Installed dependencies"
echo "Will create new build"
npm run build
echo "New build ready"
echo "Will clean S3"
aws s3 rm $s3url --recursive
echo "Will deploy in S3"
aws s3 cp ./build $s3url --recursive --acl public-read --profile personal
echo "Finished new deployments"
echo "Will invalidate all cloudfront paths"
aws cloudfront create-invalidation --distribution-id $cfDist --paths "/*" --profile personal
echo "Invalidated"